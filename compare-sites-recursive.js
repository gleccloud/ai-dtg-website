const { chromium } = require('playwright');

async function compareAndImprove() {
    console.log('🔍 Starting recursive site comparison...\n');

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });

    // Open both sites
    const prodPage = await context.newPage();
    const localPage = await context.newPage();

    console.log('📡 Loading production site: https://dtg.glec.io/');
    await prodPage.goto('https://dtg.glec.io/', { waitUntil: 'networkidle' });

    console.log('🏠 Loading local site: http://127.0.0.1:8093/ai-dtg-premium-website/index.html');
    await localPage.goto('http://127.0.0.1:8093/ai-dtg-premium-website/index.html', { waitUntil: 'networkidle' });

    await new Promise(resolve => setTimeout(resolve, 2000));

    // ==================== ANALYSIS 1: HTML Structure ====================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📋 ANALYSIS 1: HTML Structure Comparison');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const prodStructure = await prodPage.evaluate(() => {
        const sections = [];
        document.querySelectorAll('section, div[id], div[class*="section"]').forEach(el => {
            const id = el.id || '';
            const classes = el.className || '';
            const tag = el.tagName.toLowerCase();

            if (id || classes.includes('section') || tag === 'section') {
                sections.push({
                    tag,
                    id,
                    classes: classes.split(' ').filter(c => c).join(' '),
                    text: el.innerText?.substring(0, 100) || ''
                });
            }
        });
        return sections;
    });

    const localStructure = await localPage.evaluate(() => {
        const sections = [];
        document.querySelectorAll('section, div[id], div[class*="section"]').forEach(el => {
            const id = el.id || '';
            const classes = el.className || '';
            const tag = el.tagName.toLowerCase();

            if (id || classes.includes('section') || tag === 'section') {
                sections.push({
                    tag,
                    id,
                    classes: classes.split(' ').filter(c => c).join(' '),
                    text: el.innerText?.substring(0, 100) || ''
                });
            }
        });
        return sections;
    });

    console.log('🌐 Production site sections:', prodStructure.length);
    console.log('🏠 Local site sections:', localStructure.length);
    console.log('\n📊 Production sections:');
    prodStructure.slice(0, 20).forEach((s, i) => {
        console.log(`  ${i+1}. <${s.tag}> id="${s.id}" class="${s.classes.substring(0, 50)}"`);
    });

    // ==================== ANALYSIS 2: Missing Components ====================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🔍 ANALYSIS 2: Component Detection');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const prodComponents = await prodPage.evaluate(() => {
        const components = {
            forms: [],
            videos: [],
            buttons: [],
            navLinks: [],
            images: [],
            animations: [],
            scripts: []
        };

        // Forms
        document.querySelectorAll('form').forEach(form => {
            components.forms.push({
                id: form.id || 'unnamed',
                action: form.action || '',
                method: form.method || '',
                inputs: form.querySelectorAll('input, textarea, select').length
            });
        });

        // Videos
        document.querySelectorAll('video').forEach(video => {
            components.videos.push({
                src: video.src || video.querySelector('source')?.src || '',
                autoplay: video.autoplay,
                loop: video.loop,
                muted: video.muted
            });
        });

        // Buttons
        document.querySelectorAll('button, a.button, a.btn, .cta-button').forEach(btn => {
            const text = btn.innerText?.trim().substring(0, 50) || '';
            if (text) {
                components.buttons.push({
                    text,
                    class: btn.className || '',
                    href: btn.href || ''
                });
            }
        });

        // Navigation links
        document.querySelectorAll('nav a, .nav-link, header a').forEach(link => {
            components.navLinks.push({
                text: link.innerText?.trim() || '',
                href: link.href || ''
            });
        });

        // Images
        document.querySelectorAll('img').forEach(img => {
            if (img.src && !img.src.includes('data:image')) {
                components.images.push({
                    src: img.src.split('/').pop(),
                    alt: img.alt || ''
                });
            }
        });

        // Animation classes
        const animationClasses = ['fade', 'slide', 'zoom', 'rotate', 'animate', 'aos', 'parallax'];
        document.querySelectorAll('[class]').forEach(el => {
            const classes = el.className.toString();
            animationClasses.forEach(anim => {
                if (classes.includes(anim)) {
                    components.animations.push({
                        class: classes.split(' ').find(c => c.includes(anim)) || '',
                        element: el.tagName.toLowerCase()
                    });
                }
            });
        });

        // External scripts
        document.querySelectorAll('script[src]').forEach(script => {
            const src = script.src || '';
            if (src && !src.includes('localhost')) {
                components.scripts.push(src.split('/').pop());
            }
        });

        return components;
    });

    const localComponents = await localPage.evaluate(() => {
        const components = {
            forms: [],
            videos: [],
            buttons: [],
            navLinks: [],
            images: [],
            animations: [],
            scripts: []
        };

        // Forms
        document.querySelectorAll('form').forEach(form => {
            components.forms.push({
                id: form.id || 'unnamed',
                action: form.action || '',
                method: form.method || '',
                inputs: form.querySelectorAll('input, textarea, select').length
            });
        });

        // Videos
        document.querySelectorAll('video').forEach(video => {
            components.videos.push({
                src: video.src || video.querySelector('source')?.src || '',
                autoplay: video.autoplay,
                loop: video.loop,
                muted: video.muted
            });
        });

        // Buttons
        document.querySelectorAll('button, a.button, a.btn, .cta-button').forEach(btn => {
            const text = btn.innerText?.trim().substring(0, 50) || '';
            if (text) {
                components.buttons.push({
                    text,
                    class: btn.className || '',
                    href: btn.href || ''
                });
            }
        });

        // Navigation links
        document.querySelectorAll('nav a, .nav-link, header a').forEach(link => {
            components.navLinks.push({
                text: link.innerText?.trim() || '',
                href: link.href || ''
            });
        });

        // Images
        document.querySelectorAll('img').forEach(img => {
            if (img.src && !img.src.includes('data:image')) {
                components.images.push({
                    src: img.src.split('/').pop(),
                    alt: img.alt || ''
                });
            }
        });

        // Animation classes
        const animationClasses = ['fade', 'slide', 'zoom', 'rotate', 'animate', 'aos', 'parallax'];
        document.querySelectorAll('[class]').forEach(el => {
            const classes = el.className.toString();
            animationClasses.forEach(anim => {
                if (classes.includes(anim)) {
                    components.animations.push({
                        class: classes.split(' ').find(c => c.includes(anim)) || '',
                        element: el.tagName.toLowerCase()
                    });
                }
            });
        });

        // External scripts
        document.querySelectorAll('script[src]').forEach(script => {
            const src = script.src || '';
            if (src && !src.includes('localhost')) {
                components.scripts.push(src.split('/').pop());
            }
        });

        return components;
    });

    console.log('📝 Forms:');
    console.log(`  Production: ${prodComponents.forms.length}`);
    console.log(`  Local: ${localComponents.forms.length}`);
    prodComponents.forms.forEach((form, i) => {
        console.log(`    ${i+1}. ${form.id} (${form.inputs} inputs)`);
    });

    console.log('\n🎬 Videos:');
    console.log(`  Production: ${prodComponents.videos.length}`);
    console.log(`  Local: ${localComponents.videos.length}`);

    console.log('\n🔘 Buttons (first 10):');
    console.log(`  Production: ${prodComponents.buttons.length}`);
    console.log(`  Local: ${localComponents.buttons.length}`);
    prodComponents.buttons.slice(0, 10).forEach((btn, i) => {
        console.log(`    ${i+1}. "${btn.text}"`);
    });

    console.log('\n🧭 Navigation Links:');
    console.log(`  Production: ${prodComponents.navLinks.length}`);
    console.log(`  Local: ${localComponents.navLinks.length}`);
    prodComponents.navLinks.forEach((link, i) => {
        console.log(`    ${i+1}. "${link.text}" → ${link.href}`);
    });

    console.log('\n🖼️  Images:');
    console.log(`  Production: ${prodComponents.images.length}`);
    console.log(`  Local: ${localComponents.images.length}`);

    console.log('\n✨ Animations:');
    console.log(`  Production: ${prodComponents.animations.length}`);
    console.log(`  Local: ${localComponents.animations.length}`);

    console.log('\n📦 External Scripts:');
    console.log(`  Production: ${prodComponents.scripts.length}`);
    console.log(`  Local: ${localComponents.scripts.length}`);
    prodComponents.scripts.forEach((script, i) => {
        console.log(`    ${i+1}. ${script}`);
    });

    // ==================== ANALYSIS 3: Visual Comparison ====================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📸 ANALYSIS 3: Visual Comparison');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    await prodPage.screenshot({ path: 'screenshots/prod-site-full.png', fullPage: true });
    await localPage.screenshot({ path: 'screenshots/local-site-full.png', fullPage: true });
    console.log('✅ Screenshots saved to screenshots/ folder');

    // ==================== ANALYSIS 4: Missing Sections ====================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🚨 ANALYSIS 4: Missing Sections & Components');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    const missing = {
        forms: prodComponents.forms.length - localComponents.forms.length,
        videos: prodComponents.videos.length - localComponents.videos.length,
        buttons: prodComponents.buttons.length - localComponents.buttons.length,
        navLinks: prodComponents.navLinks.length - localComponents.navLinks.length,
        images: prodComponents.images.length - localComponents.images.length,
        animations: prodComponents.animations.length - localComponents.animations.length,
        scripts: prodComponents.scripts.length - localComponents.scripts.length
    };

    console.log('⚠️  Missing components in local version:');
    Object.entries(missing).forEach(([key, count]) => {
        if (count > 0) {
            console.log(`  ❌ ${key}: ${count} missing`);
        } else if (count < 0) {
            console.log(`  ➕ ${key}: ${Math.abs(count)} extra`);
        } else {
            console.log(`  ✅ ${key}: matched`);
        }
    });

    // ==================== ANALYSIS 5: Check local repo files ====================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📁 ANALYSIS 5: Available Components in Local Repo');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🔍 Checking ai-dtg-final-stable-version/index.html...');

    const stablePage = await context.newPage();
    await stablePage.goto('http://127.0.0.1:8093/ai-dtg-final-stable-version/index.html', { waitUntil: 'networkidle' });

    const stableComponents = await stablePage.evaluate(() => {
        return {
            forms: document.querySelectorAll('form').length,
            videos: document.querySelectorAll('video').length,
            buttons: document.querySelectorAll('button, a.button, a.btn, .cta-button').length,
            sections: document.querySelectorAll('section').length,
            hasLanguageSelector: !!document.getElementById('languageSelector'),
            hasCESSection: !!document.querySelector('[class*="ces"]') || document.body.innerHTML.includes('CES 2026'),
            hasContactForm: !!document.querySelector('form[id*="contact"]') || document.body.innerHTML.includes('contact'),
        };
    });

    console.log('📊 ai-dtg-final-stable-version components:');
    console.log(`  Forms: ${stableComponents.forms}`);
    console.log(`  Videos: ${stableComponents.videos}`);
    console.log(`  Buttons: ${stableComponents.buttons}`);
    console.log(`  Sections: ${stableComponents.sections}`);
    console.log(`  Language Selector: ${stableComponents.hasLanguageSelector ? '✅' : '❌'}`);
    console.log(`  CES Section: ${stableComponents.hasCESSection ? '✅' : '❌'}`);
    console.log(`  Contact Form: ${stableComponents.hasContactForm ? '✅' : '❌'}`);

    // ==================== SUMMARY ====================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📝 SUMMARY & RECOMMENDATIONS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('🎯 Next Steps:');
    console.log('  1. Review screenshots in screenshots/ folder');
    console.log('  2. Compare ai-dtg-final-stable-version with production');
    console.log('  3. Extract missing components from stable version');
    console.log('  4. Integrate into ai-dtg-premium-website/index.html');
    console.log('  5. Re-test language selector');
    console.log('  6. Verify all sections are responsive');

    console.log('\n⏳ Keeping browser open for 30 seconds for manual inspection...');
    await new Promise(resolve => setTimeout(resolve, 30000));

    await browser.close();
    console.log('\n✅ Comparison complete!');
}

compareAndImprove().catch(console.error);
