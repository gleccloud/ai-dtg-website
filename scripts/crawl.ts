import type { Page, BrowserContext, Route } from '@playwright/test';
import { chromium } from 'playwright-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import fs from 'fs/promises';
import { writeJsonAtomic } from './util';
import { logger } from './logger';

chromium.use(StealthPlugin());

const DEFAULT_MAX_PAGES = 200;
const DEFAULT_CONCURRENCY = 4;
const TIMEOUT_MS = 30000;
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

interface CrawlTask {
	url: string;
	depth: number;
}

interface AssetRecord {
	url: string;
	filepath: string;
	type: 'html' | 'css' | 'js' | 'img' | 'font' | 'json' | 'other';
}

interface Manifest {
	pages: { url: string; file: string }[];
	assets: { url: string; file: string; type: AssetRecord['type'] }[];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function ensureDir(dir: string) {
	try {
		const stat = await fs.lstat(dir).catch(() => null);
		if (stat && stat.isFile()) {
			await fs.unlink(dir);
		}
	} catch {}
	await fs.mkdir(dir, { recursive: true });
}

function sanitizePath(p: string): string {
	return p
		.replace(/\?.*$/, '')
		.replace(/[#%*:<>?"|]/g, '_')
		.replace(/\/$/, '')
		.replace(/^\/+/, '');
}

function canonicalizeUrl(urlString: string): string {
	try {
		const u = new URL(urlString);
		u.hash = '';
		u.search = '';
		return u.href;
	} catch {
		return urlString;
	}
}

function mapUrlToFile(baseHost: string, baseOut: string, targetUrl: URL): string {
	const pathname = targetUrl.pathname || '/';
	let relativePath: string;
	if (pathname.endsWith('/') || pathname === '') {
		relativePath = path.join(pathname, 'index.html');
	} else {
		relativePath = pathname;
	}
	const sanitized = sanitizePath(relativePath);
	if (targetUrl.host === baseHost) {
		return path.join(baseOut, baseHost, sanitized);
	}
	return path.join(baseOut, baseHost, '_external', targetUrl.host, sanitized);
}

function classifyAsset(url: string): AssetRecord['type'] {
	const u = url.toLowerCase();
	if (u.match(/\.(png|jpe?g|gif|webp|svg)$/)) return 'img';
	if (u.match(/\.(woff2?|ttf|otf|eot)$/)) return 'font';
	if (u.match(/\.(css)$/)) return 'css';
	if (u.match(/\.(m?js)$/)) return 'js';
	if (u.match(/\.(json)$/)) return 'json';
	if (u.match(/\.(html?)$/) || u.endsWith('/')) return 'html';
	return 'other';
}

async function saveFile(filePath: string, content: Buffer | string) {
	await ensureDir(path.dirname(filePath));
	await fs.writeFile(filePath, content);
}

async function fetchBinary(context: BrowserContext, url: string, attempts = 3): Promise<Buffer> {
	let lastErr: any;
	for (let i = 0; i < attempts; i++) {
		const page = await context.newPage();
		try {
			const resp = await page.goto(url, { waitUntil: 'load', timeout: TIMEOUT_MS });
			if (!resp) throw new Error('No response');
			const buf = await resp.body();
			await page.close();
			return Buffer.from(buf);
		} catch (e) {
			lastErr = e;
			await page.close();
			await sleep(250 * (i + 1));
		}
	}
	throw lastErr;
}

function rewriteHtmlForOffline(html: string, baseOrigin: string, baseHost: string): string {
	const sameOrigin = new RegExp(`(href|src)="${baseOrigin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
	const rootAbs = /(href|src)="\//g;
	const external = /(href|src)="https?:\/\/([^\"/]+)(\/[^\"]*)/g;
	return html
		.replace(rootAbs, `$1="/${baseHost}/`)
		.replace(sameOrigin, `$1="/${baseHost}`)
		.replace(external, (_m, attr, host, pth) => `${attr}="/${baseHost}/_external/${host}${pth}`);
}

function extractCssUrls(cssText: string, baseUrl: string): string[] {
	const urls: string[] = [];
	const urlRegex = /url\(([^)]+)\)/g;
	let m: RegExpExecArray | null;
	while ((m = urlRegex.exec(cssText)) !== null) {
		let raw = m[1].trim().replace(/^['"]|['"]$/g, '');
		if (raw.startsWith('data:')) continue;
		try {
			const abs = new URL(raw, baseUrl).href;
			urls.push(abs);
		} catch {}
	}
	return Array.from(new Set(urls));
}

async function autoScroll(page: Page) {
	await page.evaluate(async () => {
		await new Promise<void>((resolve) => {
			let total = 0;
			const step = () => {
				const delta = Math.min(800, document.body.scrollHeight - window.scrollY - window.innerHeight);
				window.scrollBy(0, 800);
				total += 800;
				if (window.scrollY + window.innerHeight >= document.body.scrollHeight || total > 100000) {
					setTimeout(() => resolve(), 400);
				} else {
					setTimeout(step, 200);
				}
			};
			step();
		});
	});
}

function offlineAssetUrl(baseHost: string, absUrl: URL): string {
	const pathname = absUrl.pathname || '/';
	const sanitized = sanitizePath(pathname);
	if (absUrl.host === baseHost) {
		return `/${baseHost}/${sanitized}`;
	}
	return `/${baseHost}/_external/${absUrl.host}/${sanitized}`;
}

function rewriteCssForOffline(cssText: string, baseOrigin: string, baseHost: string, cssBaseUrl: string): string {
	return cssText.replace(/url\(([^)]+)\)/g, (full, p1) => {
		let raw = String(p1).trim().replace(/^['"]|['"]$/g, '');
		if (raw.startsWith('data:')) return full;
		try {
			const abs = new URL(raw, cssBaseUrl);
			if (abs.origin === baseOrigin) {
				return `url('${offlineAssetUrl(baseHost, abs)}')`;
			}
			return full;
		} catch {
			return full;
		}
	});
}

async function extractLinks(page: Page, baseOrigin: string, pathPrefix: string): Promise<string[]> {
	const urls = await page.evaluate(() => {
		const anchors = Array.from(document.querySelectorAll('a[href]')) as HTMLAnchorElement[];
		return anchors.map(a => a.href);
	});
	return urls.filter(u => u.startsWith(baseOrigin) && new URL(u).pathname.startsWith(pathPrefix));
}

async function extractAssets(page: Page): Promise<string[]> {
	const assets = await page.evaluate(() => {
		const urls: string[] = [];
		const srcs = Array.from(document.querySelectorAll('[src]')) as Array<HTMLElement & { src?: string }>;
		srcs.forEach(el => { const v = el.getAttribute('src'); if (v) urls.push(new URL(v, location.href).href); });
		const hrefs = Array.from(document.querySelectorAll('link[href]')) as HTMLLinkElement[];
		hrefs.forEach(l => { const v = l.getAttribute('href'); if (v) urls.push(new URL(v, location.href).href); });
		const srcsets = Array.from(document.querySelectorAll('img[srcset]')) as HTMLImageElement[];
		srcsets.forEach(img => {
			const set = img.getAttribute('srcset');
			if (set) {
				set.split(',').map(s => s.trim().split(' ')[0]).filter(Boolean).forEach(u => urls.push(new URL(u, location.href).href));
			}
		});
		const datas = Array.from(document.querySelectorAll('[data-src], [data-href]')) as HTMLElement[];
		datas.forEach(el => {
			const ds = el.getAttribute('data-src');
			const dh = el.getAttribute('data-href');
			if (ds) urls.push(new URL(ds, location.href).href);
			if (dh) urls.push(new URL(dh, location.href).href);
		});
		return urls;
	});
	return Array.from(new Set(assets));
}

async function crawl(startUrl: string, outDir: string, maxPages = DEFAULT_MAX_PAGES, pathPrefix = '/beetle_x31/', concurrency = DEFAULT_CONCURRENCY, resume = true) {
	const start = new URL(startUrl);
	const baseOrigin = start.origin;
	const baseHost = start.host;

	await ensureDir(path.join(outDir, baseHost));

	const startTime = Date.now();
	const seen = new Set<string>();
	const downloaded = new Set<string>();
	const queue: CrawlTask[] = [{ url: canonicalizeUrl(start.href), depth: 0 }];
	const htmlSaved = new Set<string>();
	const manifestPath = path.join(outDir, baseHost, 'manifest.json');
	let manifest: Manifest = { pages: [], assets: [] };
	const errors: string[] = [];
	
	// Log crawl start
	logger.crawlStart(startUrl, maxPages, concurrency);

	// Resume support: load existing manifest
	if (resume) {
		try {
			const buf = await fs.readFile(manifestPath, 'utf-8');
			manifest = JSON.parse(buf) as Manifest;
			for (const p of manifest.pages) {
				htmlSaved.add(p.url);
				// 방문 처리(seen)는 재개 시 미리 하지 않아, 페이지를 다시 열어 자산을 더 수집
			}
			for (const a of manifest.assets) {
				downloaded.add(a.url);
			}
			console.log(`Resume: loaded ${manifest.pages.length} pages, ${manifest.assets.length} assets`);
		} catch {}
	}

	const browser = await chromium.launch({ headless: true });
	const context = await browser.newContext({ userAgent: USER_AGENT });

	async function worker(workerId: number) {
		while (queue.length > 0 && htmlSaved.size < maxPages) {
			const task = queue.shift();
			if (!task) break;
			if (seen.has(task.url)) continue;
			seen.add(task.url);

			const page = await context.newPage();
			const workerTimer = logger.startTimer();
			try {
				page.setDefaultTimeout(TIMEOUT_MS);
				await page.route('**/*', (route: Route) => {
					const req = route.request();
					const url = req.url();
					// 외부 도메인도 허용하여 저장 대상으로 수집
					return route.continue();
				});

				page.on('response', async (r) => {
					try {
						const u = canonicalizeUrl(r.url());
						if (!/^https?:\/\//i.test(u)) return;
						const ct = (r.headers()['content-type'] || '').toLowerCase();
						const rt = r.request().resourceType();
						if (['image','stylesheet','script','font','media','xhr','fetch'].includes(rt) || /^(image|font|text\/css|application\/javascript|application\/json)/.test(ct)) {
							if (!downloaded.has(u)) {
								try {
									const t = classifyAsset(u);
									const p = mapUrlToFile(baseHost, outDir, new URL(u));
									const b = await fetchBinary(context, u);
									await saveFile(p, b);
									downloaded.add(u);
									manifest.assets.push({ url: u, file: path.relative(outDir, p), type: t });
									await writeJsonAtomic(path.join(outDir, baseHost, 'manifest.json'), manifest);
									console.log(`[${workerId}] Live ${t}: ${u} -> ${path.relative(outDir, p)}`);
								} catch {}
							}
						}
					} catch {}
				});

				const resp = await page.goto(task.url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS });
				await autoScroll(page);
				await page.waitForLoadState('networkidle', { timeout: TIMEOUT_MS }).catch(() => {});
				if (!resp) throw new Error('No response');
				const ok = resp.ok();
				if (!ok) {
					logger.warn('PAGE_SKIP', `Page skipped due to status ${resp.status()}`, { status: resp.status() }, String(workerId), task.url);
					await page.close();
					continue;
				}

				let html = await page.content();
				html = rewriteHtmlForOffline(html, baseOrigin, baseHost);
				const filePath = mapUrlToFile(baseHost, outDir, new URL(task.url));
				await saveFile(filePath, html);
				htmlSaved.add(task.url);
				manifest.pages.push({ url: task.url, file: path.relative(outDir, filePath) });
				await writeJsonAtomic(path.join(outDir, baseHost, 'manifest.json'), manifest);
				
				// Log successful page processing
				const duration = workerTimer();
				logger.pageProcessed(String(workerId), task.url, task.depth, duration, true);
				console.log(`[${workerId}] Saved HTML: ${task.url} -> ${path.relative(outDir, filePath)}`);

				const links = await extractLinks(page, baseOrigin, pathPrefix);
				for (const link of links) {
					const canon = canonicalizeUrl(link);
					if (!seen.has(canon)) queue.push({ url: canon, depth: task.depth + 1 });
				}

				const assets = await extractAssets(page);
				for (const assetUrl of assets) {
					try {
						const canonAsset = canonicalizeUrl(assetUrl);
						if (downloaded.has(canonAsset)) continue;
						const type = classifyAsset(canonAsset);
						const assetFilePath = mapUrlToFile(baseHost, outDir, new URL(canonAsset));
						const buf = await fetchBinary(context, canonAsset);
						let outBuf = buf;
						if (type === 'css') {
							const cssText = buf.toString('utf-8');
							const rewritten = rewriteCssForOffline(cssText, baseOrigin, baseHost, canonAsset);
							outBuf = Buffer.from(rewritten, 'utf-8');
						}
						await saveFile(assetFilePath, outBuf);
						downloaded.add(canonAsset);
						manifest.assets.push({ url: canonAsset, file: path.relative(outDir, assetFilePath), type });
						await writeJsonAtomic(path.join(outDir, baseHost, 'manifest.json'), manifest);
						
						// Log asset download
						logger.assetDownloaded(String(workerId), canonAsset, type, path.relative(outDir, assetFilePath), 0);
						console.log(`[${workerId}] Saved ${type}: ${canonAsset} -> ${path.relative(outDir, assetFilePath)}`);

						// If CSS, parse and enqueue nested assets
						if (type === 'css') {
							try {
								const cssText = buf.toString('utf-8');
								const nested = extractCssUrls(cssText, assetUrl);
								for (const nurl of nested) {
									const cn = canonicalizeUrl(nurl);
									if (cn.startsWith(baseOrigin) && new URL(cn).pathname.startsWith(pathPrefix)) {
										try {
											const ntype = classifyAsset(cn);
											const npath = mapUrlToFile(baseHost, outDir, new URL(cn));
											const nbuf = await fetchBinary(context, cn);
											let nout = nbuf;
											if (ntype === 'css') {
												const ctext = nbuf.toString('utf-8');
												const rew = rewriteCssForOffline(ctext, baseOrigin, baseHost, cn);
												nout = Buffer.from(rew, 'utf-8');
											}
											await saveFile(npath, nout);
											manifest.assets.push({ url: cn, file: path.relative(outDir, npath), type: ntype });
											await writeJsonAtomic(path.join(outDir, baseHost, 'manifest.json'), manifest);
											
											// Log nested asset download
											logger.assetDownloaded(String(workerId), cn, ntype, path.relative(outDir, npath), 0);
											console.log(`[${workerId}] Saved nested ${ntype}: ${cn} -> ${path.relative(outDir, npath)}`);
										} catch (e) {
											console.warn(`[${workerId}] Nested asset fail ${nurl}:`, (e as Error).message);
										}
									}
								}
							} catch {}
						}
					} catch (e) {
						console.warn(`[${workerId}] Asset fail ${assetUrl}:`, (e as Error).message);
					}
				}

				await sleep(200);
			} catch (err) {
				const duration = workerTimer();
				const errorMsg = (err as Error).message;
				errors.push(`${task.url}: ${errorMsg}`);
				logger.pageProcessed(String(workerId), task.url, task.depth, duration, false);
				logger.error('PAGE_ERROR', `Error processing page: ${errorMsg}`, { error: errorMsg }, String(workerId), task.url);
				console.warn(`[${workerId}] Error on ${task.url}:`, errorMsg);
			} finally {
				await page.close();
			}
		}
	}

	const workers = Array.from({ length: concurrency }, (_, i) => worker(i + 1));
	await Promise.all(workers);

	await context.close();
	await browser.close();

	// Write manifest
	await saveFile(path.join(outDir, baseHost, 'manifest.json'), Buffer.from(JSON.stringify(manifest, null, 2), 'utf-8'));

	// Log crawl completion
	const totalDuration = Date.now() - startTime;
	const totalAssets = manifest.assets.length;
	const errorCount = errors.length;
	logger.crawlComplete({
		totalPages: htmlSaved.size,
		totalAssets,
		errors: errorCount,
		duration: totalDuration
	});

	console.log(`Done. HTML pages saved: ${htmlSaved.size}`);
}

async function main() {
	const args = process.argv.slice(2);
	const start = args[0] || 'https://ssd.skhynix.com/beetle_x31/';
	const outDir = path.resolve('output');
	const prefixArgIdx = args.findIndex(a => a === '--prefix');
	const pathPrefix = prefixArgIdx >= 0 ? (args[prefixArgIdx + 1] || '/beetle_x31/') : '/beetle_x31/';
	const concIdx = args.findIndex(a => a === '--concurrency');
	const concurrency = concIdx >= 0 ? Math.max(1, parseInt(args[concIdx + 1] || String(DEFAULT_CONCURRENCY), 10)) : DEFAULT_CONCURRENCY;
	const maxIdx = args.findIndex(a => a === '--max');
	const maxPages = maxIdx >= 0 ? Math.max(1, parseInt(args[maxIdx + 1] || String(DEFAULT_MAX_PAGES), 10)) : DEFAULT_MAX_PAGES;
	const noResume = args.includes('--no-resume');
	await crawl(start, outDir, maxPages, pathPrefix, concurrency, !noResume);
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
