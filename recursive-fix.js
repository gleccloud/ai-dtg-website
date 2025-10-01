const { chromium } = require('playwright');

async function recursiveFix() {
    console.log('🔧 Starting recursive diagnosis and fix...\n');

    const browser = await chromium.launch({ headless: false, slowMo: 500 });
    const page = await browser.newPage();

    // Capture all console messages
    const consoleLogs = [];
    page.on('console', msg => {
        const text = msg.text();
        consoleLogs.push(text);
        console.log('  📝 BROWSER:', text);
    });

    try {
        await page.goto('http://127.0.0.1:8093/index.html');
        await page.waitForLoadState('load');
        await page.waitForTimeout(2000);
        console.log('✅ Page loaded\n');

        // Test 1: Check if initialization logs appear
        console.log('='.repeat(70));
        console.log('Test 1: Check Initialization');
        console.log('='.repeat(70));

        const hasInitLog = consoleLogs.some(log => log.includes('Initializing language selector'));
        const hasSuccessLog = consoleLogs.some(log => log.includes('initialized successfully'));

        console.log('Has init log:', hasInitLog ? '✅' : '❌');
        console.log('Has success log:', hasSuccessLog ? '✅' : '❌');

        if (!hasInitLog) {
            console.log('\n❌ ISSUE: Script not executing!');
            console.log('Checking script tag...\n');

            const scriptCheck = await page.evaluate(() => {
                const scripts = Array.from(document.querySelectorAll('script'));
                return {
                    totalScripts: scripts.length,
                    hasLanguageScript: scripts.some(s => s.textContent.includes('languageButton'))
                };
            });
            console.log('Script check:', scriptCheck);
        }

        // Test 2: Check if button exists and is visible
        console.log('\n' + '='.repeat(70));
        console.log('Test 2: Check Button State');
        console.log('='.repeat(70));

        const buttonState = await page.evaluate(() => {
            const btn = document.getElementById('languageButton');
            if (!btn) return { exists: false };

            const rect = btn.getBoundingClientRect();
            const style = window.getComputedStyle(btn);

            return {
                exists: true,
                visible: style.display !== 'none' && style.visibility !== 'hidden',
                opacity: style.opacity,
                position: { top: rect.top, left: rect.left, width: rect.width, height: rect.height },
                zIndex: style.zIndex,
                pointerEvents: style.pointerEvents
            };
        });

        console.log('Button state:', JSON.stringify(buttonState, null, 2));

        if (!buttonState.exists) {
            console.log('\n❌ CRITICAL: Button does not exist!');
            return;
        }

        if (!buttonState.visible) {
            console.log('\n❌ ISSUE: Button is not visible!');
        }

        if (buttonState.pointerEvents === 'none') {
            console.log('\n❌ ISSUE: Button has pointer-events: none!');
        }

        // Test 3: Try clicking button
        console.log('\n' + '='.repeat(70));
        console.log('Test 3: Try Clicking Button');
        console.log('='.repeat(70));

        const beforeClickLogs = consoleLogs.length;

        try {
            await page.click('#languageButton', { timeout: 5000 });
            await page.waitForTimeout(1000);

            const afterClickLogs = consoleLogs.slice(beforeClickLogs);
            console.log('New logs after click:', afterClickLogs.length);

            if (afterClickLogs.length === 0) {
                console.log('❌ No console logs after click - event listener not working!');
            } else {
                afterClickLogs.forEach(log => console.log('  ', log));
            }
        } catch (error) {
            console.log('❌ Click failed:', error.message);
        }

        // Test 4: Check dropdown state
        console.log('\n' + '='.repeat(70));
        console.log('Test 4: Check Dropdown State');
        console.log('='.repeat(70));

        const dropdownState = await page.evaluate(() => {
            const dropdown = document.getElementById('languageDropdown');
            if (!dropdown) return { exists: false };

            const style = window.getComputedStyle(dropdown);
            return {
                exists: true,
                hasActiveClass: dropdown.classList.contains('active'),
                opacity: style.opacity,
                visibility: style.visibility,
                display: style.display,
                transform: style.transform,
                pointerEvents: style.pointerEvents,
                zIndex: style.zIndex
            };
        });

        console.log('Dropdown state:', JSON.stringify(dropdownState, null, 2));

        // Test 5: Manual script execution
        console.log('\n' + '='.repeat(70));
        console.log('Test 5: Manual Event Listener Test');
        console.log('='.repeat(70));

        const manualTest = await page.evaluate(() => {
            const btn = document.getElementById('languageButton');
            const dropdown = document.getElementById('languageDropdown');

            if (!btn || !dropdown) return { success: false, error: 'Elements not found' };

            // Try adding event listener manually
            let clicked = false;
            btn.addEventListener('click', function() {
                clicked = true;
                dropdown.classList.toggle('active');
            });

            // Simulate click
            btn.click();

            return {
                success: true,
                clicked: clicked,
                dropdownHasActive: dropdown.classList.contains('active')
            };
        });

        console.log('Manual test result:', manualTest);

        if (manualTest.success && manualTest.clicked) {
            console.log('✅ Manual event listener works!');
            console.log('❌ ISSUE: Original script event listeners not attaching');
        }

        // Test 6: Check for JavaScript errors
        console.log('\n' + '='.repeat(70));
        console.log('Test 6: Check for JavaScript Errors');
        console.log('='.repeat(70));

        const errors = [];
        page.on('pageerror', error => {
            errors.push(error.message);
        });

        await page.reload();
        await page.waitForTimeout(2000);

        if (errors.length > 0) {
            console.log('❌ JavaScript errors found:');
            errors.forEach(err => console.log('  ', err));
        } else {
            console.log('✅ No JavaScript errors');
        }

        // Test 7: Fix attempt - inject working script
        console.log('\n' + '='.repeat(70));
        console.log('Test 7: Inject Fix');
        console.log('='.repeat(70));

        const fixResult = await page.evaluate(() => {
            const btn = document.getElementById('languageButton');
            const dropdown = document.getElementById('languageDropdown');
            const options = document.querySelectorAll('.language-option');

            if (!btn || !dropdown) {
                return { success: false, error: 'Elements not found' };
            }

            // Remove all existing listeners by cloning elements
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            const newDropdown = dropdown.cloneNode(true);
            dropdown.parentNode.replaceChild(newDropdown, dropdown);

            // Re-query elements
            const freshBtn = document.getElementById('languageButton');
            const freshDropdown = document.getElementById('languageDropdown');
            const freshOptions = document.querySelectorAll('.language-option');

            // Add new listeners
            freshBtn.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                freshDropdown.classList.toggle('active');
                console.log('🔘 Dropdown toggled!');
            });

            freshOptions.forEach(opt => {
                opt.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const lang = this.getAttribute('data-lang');
                    console.log('🌐 Language:', lang);

                    document.getElementById('currentLanguage').textContent = this.textContent.trim();

                    freshOptions.forEach(o => o.classList.remove('active'));
                    this.classList.add('active');

                    freshDropdown.classList.remove('active');
                });
            });

            return { success: true, listeners: 'attached' };
        });

        console.log('Fix injection result:', fixResult);

        if (fixResult.success) {
            console.log('\n✅ Fix injected! Testing now...\n');

            await page.click('#languageButton');
            await page.waitForTimeout(500);

            const isOpen = await page.$('#languageDropdown.active');
            if (isOpen) {
                console.log('✅ Dropdown opened after fix!');

                // Try clicking Korean
                await page.click('.language-option[data-lang="ko"]');
                await page.waitForTimeout(500);

                const currentLang = await page.textContent('#currentLanguage');
                console.log('Current language:', currentLang);

                if (currentLang === '한국어') {
                    console.log('✅ Korean selection works!');
                }
            } else {
                console.log('❌ Dropdown still not opening');
            }
        }

        await page.screenshot({
            path: '/Users/kevin/Downloads/AI-DTG Website/screenshots/recursive-fix.png',
            fullPage: false
        });

        console.log('\n📸 Screenshot saved');
        await page.waitForTimeout(3000);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await browser.close();
    }
}

recursiveFix();
