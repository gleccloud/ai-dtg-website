const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 3014;

function getContentType(ext) {
	switch (ext) {
		case '.js': return 'text/javascript';
		case '.css': return 'text/css';
		case '.json': return 'application/json';
		case '.png': return 'image/png';
		case '.jpg':
		case '.jpeg': return 'image/jpeg';
		case '.svg': return 'image/svg+xml';
		case '.webp': return 'image/webp';
		case '.mp4': return 'video/mp4';
		case '.mov': return 'video/quicktime';
		case '.ico': return 'image/x-icon';
		case '.html':
		default: return 'text/html';
	}
}

function safeJoin(base, target) {
	const targetPath = '.' + path.normalize('/' + target);
	return path.join(base, targetPath);
}

const server = http.createServer((req, res) => {
	// CORS headers
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range, Authorization');

	if (req.method === 'OPTIONS') {
		res.writeHead(200);
		res.end();
		return;
	}

	// Decode URL (handle spaces/Unicode)
	const parsed = url.parse(req.url);
	let pathname = parsed.pathname || '/';
	try {
		pathname = decodeURIComponent(pathname);
	} catch (_) { /* ignore decode errors */ }

	// Default file
	let requestedPath = pathname === '/' ? '/index.html' : pathname;
	let filePath = safeJoin(__dirname, requestedPath);

	// If path points to a directory, serve index.html inside it
	try {
		const stat = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
		if (stat && stat.isDirectory()) {
			filePath = path.join(filePath, 'index.html');
		}
	} catch (_) {}

	// Serve with Range support for videos
	fs.stat(filePath, (err, stats) => {
		if (err || !stats || !stats.isFile()) {
			res.writeHead(404, { 'Content-Type': 'text/html' });
			res.end('<h1>404 - File Not Found</h1>');
			return;
		}

		const ext = path.extname(filePath).toLowerCase();
		const contentType = getContentType(ext);

		// Handle Range for video streaming
		if ((ext === '.mp4' || ext === '.mov') && req.headers.range) {
			const range = req.headers.range;
			const total = stats.size;
			const parts = range.replace(/bytes=/, '').split('-');
			const start = parseInt(parts[0], 10);
			const end = parts[1] ? parseInt(parts[1], 10) : total - 1;

			if (isNaN(start) || isNaN(end) || start > end || end >= total) {
				res.writeHead(416, { 'Content-Range': `bytes */${total}` });
				res.end();
				return;
			}

			const chunkSize = (end - start) + 1;
			res.writeHead(206, {
				'Content-Range': `bytes ${start}-${end}/${total}`,
				'Accept-Ranges': 'bytes',
				'Content-Length': chunkSize,
				'Content-Type': contentType,
				'Cache-Control': 'no-cache'
			});
			const stream = fs.createReadStream(filePath, { start, end });
			stream.pipe(res);
			stream.on('error', () => res.end());
			return;
		}

		// HEAD support
		if (req.method === 'HEAD') {
			res.writeHead(200, {
				'Content-Type': contentType,
				'Content-Length': stats.size
			});
			res.end();
			return;
		}

		// Regular file response
		res.writeHead(200, {
			'Content-Type': contentType,
			'Content-Length': stats.size,
			'Cache-Control': 'no-cache'
		});
		fs.createReadStream(filePath).pipe(res).on('error', () => res.end());
	});
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`Serving from: ${__dirname}`);
}); 