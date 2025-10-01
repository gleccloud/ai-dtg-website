const fs = require('fs');
const path = require('path');

/**
 * GLEC AI Solutions - Asset Optimization Script
 * World-Class CTO Mode: Optimizing assets for maximum performance
 */

class GLECAssetOptimizer {
    constructor() {
        this.sourceDir = './glec-premium-showcase/public/assets';
        this.targetDir = './assets-optimized';
        this.videoAssets = {
            hero: {
                source: 'KakaoTalk_20250814_145521290.mp4',
                target: 'hero-cyberpunk.mp4',
                description: 'Cyberpunk GLEC Logo Video for Header'
            },
            transformation: {
                source: 'KakaoTalk_20250814_145511097.mp4',
                target: 'ai-transformation.mp4',
                description: 'AI Transformation Introduction Video'
            },
            dtg: {
                source: '0819 (1).mp4',
                target: 'glec-ai-dtg-demo.mp4',
                description: 'GLEC AI DTG Product Demo'
            },
            dashboard: {
                source: '화면 기록 2025-08-14 오후 5.51.51.mov',
                target: 'glec-dashboard-demo.mov',
                description: 'GLEC AI Dashboard Demo'
            },
            dashboardAlt: {
                source: '화면 기록 2025-08-14 오후 5.36.28.mov',
                target: 'glec-dashboard-alt.mov',
                description: 'GLEC AI Dashboard Alternative Demo'
            }
        };
        
        this.imageAssets = {
            dtg: {
                primary: {
                    source: '그림1 (1).png',
                    target: 'glec-ai-dtg-primary.jpg',
                    maxWidth: 800,
                    quality: 85
                },
                secondary: {
                    source: '그림2 (2).png',
                    target: 'glec-ai-dtg-secondary.jpg',
                    maxWidth: 600,
                    quality: 80
                }
            },
            dashboard: {
                primary: {
                    source: 'image (1).png',
                    target: 'glec-dashboard-primary.jpg',
                    maxWidth: 800,
                    quality: 85
                },
                secondary: {
                    source: 'image (2).png',
                    target: 'glec-dashboard-secondary.jpg',
                    maxWidth: 600,
                    quality: 80
                }
            }
        };
    }
    
    async initialize() {
        console.log('🚀 GLEC Asset Optimizer - CTO Mode Activated');
        console.log('🎯 Target: World-Class Performance Optimization');
        console.log('════════════════════════════════════════════════');
        
        await this.createDirectories();
        await this.analyzeCurrentAssets();
        await this.generateOptimizationPlan();
        await this.createAssetManifest();
        
        console.log('✅ Asset optimization planning completed!');
        console.log('📋 Check asset-optimization-plan.json for details');
    }
    
    async createDirectories() {
        const dirs = [
            this.targetDir,
            `${this.targetDir}/images`,
            `${this.targetDir}/videos`,
            `${this.targetDir}/thumbnails`
        ];
        
        for (const dir of dirs) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                console.log(`📁 Created directory: ${dir}`);
            }
        }
    }
    
    async analyzeCurrentAssets() {
        console.log('\n🔍 Analyzing current assets...');
        
        const assetDirs = [
            './glec-premium-showcase/public/assets',
            './assets/videos',
            './assets/hardware',
            './assets/images',
            './'  // Root directory for direct video files
        ];
        
        const foundAssets = {};
        
        for (const dir of assetDirs) {
            if (fs.existsSync(dir)) {
                const files = fs.readdirSync(dir);
                foundAssets[dir] = files.filter(file => 
                    file.match(/\.(mp4|mov|png|jpg|jpeg|gif|webp)$/i)
                );
                
                console.log(`   📂 ${dir}: ${foundAssets[dir].length} media files`);
                foundAssets[dir].forEach(file => {
                    console.log(`      - ${file}`);
                });
            }
        }
        
        return foundAssets;
    }
    
    async generateOptimizationPlan() {
        const optimizationPlan = {
            metadata: {
                projectName: 'GLEC AI Solutions Product Showcase',
                optimizationLevel: 'World-Class CTO Mode',
                targetPerformance: 'Premium Commercial Grade',
                createdAt: new Date().toISOString()
            },
            
            videoOptimization: {
                hero: {
                    source: 'KakaoTalk_20250814_145521290.mp4',
                    target: 'hero-cyberpunk-optimized.mp4',
                    optimizations: [
                        'Compress to H.264 with CRF 23',
                        'Resize to 1920x1080 max',
                        'Optimize for web streaming',
                        'Add fade-in/out effects',
                        'Reduce file size by 40-60%'
                    ],
                    usage: 'Hero section background video - Wide layout, Cyberpunk branding'
                },
                
                transformation: {
                    source: 'KakaoTalk_20250814_145511097.mp4',
                    target: 'ai-transformation-intro.mp4',
                    optimizations: [
                        'Compress to H.264 with CRF 25',
                        'Resize to 1200x800 max',
                        'Add professional controls',
                        'Optimize loading speed'
                    ],
                    usage: 'AI Transformation section introduction video'
                },
                
                dtgDemo: {
                    source: '0819 (1).mp4',
                    target: 'glec-dtg-product-demo.mp4',
                    optimizations: [
                        'Compress to H.264 with CRF 24',
                        'Resize to 800x600 for product showcase',
                        'Add play overlay interaction',
                        'Optimize for modal display'
                    ],
                    usage: 'GLEC AI DTG product demonstration'
                },
                
                dashboardDemo: {
                    source: '화면 기록 2025-08-14 오후 5.51.51.mov',
                    target: 'glec-dashboard-demo.mp4',
                    optimizations: [
                        'Convert MOV to MP4',
                        'Compress to H.264 with CRF 24',
                        'Resize to 800x600 for product showcase',
                        'Add interactive controls'
                    ],
                    usage: 'GLEC AI Dashboard demonstration'
                }
            },
            
            imageOptimization: {
                dtgPrimary: {
                    source: '그림1 (1).png',
                    target: 'glec-dtg-hero.webp',
                    optimizations: [
                        'Convert to WebP format',
                        'Resize to 800x600 max',
                        'Quality 85%',
                        'Add progressive loading',
                        'Generate responsive variants'
                    ],
                    responsive: ['400w', '600w', '800w'],
                    usage: 'Main GLEC AI DTG product image'
                },
                
                dtgSecondary: {
                    source: '그림2 (2).png',
                    target: 'glec-dtg-detail.webp',
                    optimizations: [
                        'Convert to WebP format',
                        'Resize to 600x400 max',
                        'Quality 80%',
                        'Compress for detail view'
                    ],
                    usage: 'GLEC AI DTG detail/secondary image'
                },
                
                dashboardPrimary: {
                    source: 'image (1).png',
                    target: 'glec-dashboard-hero.webp',
                    optimizations: [
                        'Convert to WebP format',
                        'Resize to 800x600 max',
                        'Quality 85%',
                        'Add progressive loading',
                        'Generate responsive variants'
                    ],
                    responsive: ['400w', '600w', '800w'],
                    usage: 'Main GLEC AI Dashboard product image'
                },
                
                dashboardSecondary: {
                    source: 'image (2).png',
                    target: 'glec-dashboard-detail.webp',
                    optimizations: [
                        'Convert to WebP format',
                        'Resize to 600x400 max',
                        'Quality 80%',
                        'Compress for detail view'
                    ],
                    usage: 'GLEC AI Dashboard detail/secondary image'
                }
            },
            
            performanceTargets: {
                pageSizeTarget: '< 3MB initial load',
                videoLoadTime: '< 2s for hero video',
                imageLoadTime: '< 1s per image',
                mobileOptimization: 'Full responsive support',
                browserSupport: ['Chrome 90+', 'Firefox 88+', 'Safari 14+', 'Edge 90+']
            },
            
            deliveryOptimization: {
                lazyLoading: 'Implement for all non-critical images and videos',
                preloading: 'Hero video and critical images only',
                compression: 'Gzip/Brotli for all text assets',
                caching: 'Browser cache headers for 1 year on assets'
            }
        };
        
        // Save optimization plan
        fs.writeFileSync('asset-optimization-plan.json', JSON.stringify(optimizationPlan, null, 2));
        console.log('\n📋 Generated comprehensive optimization plan');
        console.log('   - Video optimization strategies defined');
        console.log('   - Image optimization with WebP conversion');
        console.log('   - Performance targets established');
        console.log('   - Delivery optimization planned');
    }
    
    async createAssetManifest() {
        const manifest = {
            version: '1.0.0',
            lastUpdated: new Date().toISOString(),
            
            assets: {
                videos: {
                    hero: {
                        src: 'assets/videos/hero-cyberpunk-optimized.mp4',
                        type: 'video/mp4',
                        usage: 'Hero section background',
                        autoplay: true,
                        muted: true,
                        loop: true,
                        optimized: true
                    },
                    transformation: {
                        src: 'assets/videos/ai-transformation-intro.mp4',
                        type: 'video/mp4',
                        usage: 'AI Transformation section',
                        controls: true,
                        optimized: true
                    },
                    dtgDemo: {
                        src: 'assets/videos/glec-dtg-product-demo.mp4',
                        type: 'video/mp4',
                        usage: 'DTG product demonstration',
                        modal: true,
                        optimized: true
                    },
                    dashboardDemo: {
                        src: 'assets/videos/glec-dashboard-demo.mp4',
                        type: 'video/mp4',
                        usage: 'Dashboard demonstration',
                        modal: true,
                        optimized: true
                    }
                },
                
                images: {
                    dtgHero: {
                        src: 'assets/images/glec-dtg-hero.webp',
                        fallback: 'assets/images/glec-dtg-hero.jpg',
                        sizes: ['400w', '600w', '800w'],
                        usage: 'DTG product hero image',
                        lazyLoad: true
                    },
                    dtgDetail: {
                        src: 'assets/images/glec-dtg-detail.webp',
                        fallback: 'assets/images/glec-dtg-detail.jpg',
                        usage: 'DTG product detail image',
                        lazyLoad: true
                    },
                    dashboardHero: {
                        src: 'assets/images/glec-dashboard-hero.webp',
                        fallback: 'assets/images/glec-dashboard-hero.jpg',
                        sizes: ['400w', '600w', '800w'],
                        usage: 'Dashboard product hero image',
                        lazyLoad: true
                    },
                    dashboardDetail: {
                        src: 'assets/images/glec-dashboard-detail.webp',
                        fallback: 'assets/images/glec-dashboard-detail.jpg',
                        usage: 'Dashboard product detail image',
                        lazyLoad: true
                    }
                }
            },
            
            optimization: {
                totalSavings: 'Expected 50-70% file size reduction',
                performanceGain: 'Expected 40-60% faster loading',
                qualityRetention: '90%+ visual quality maintained',
                browserCompatibility: '95%+ modern browser support'
            }
        };
        
        fs.writeFileSync('asset-manifest.json', JSON.stringify(manifest, null, 2));
        console.log('\n📦 Created asset manifest for production deployment');
    }
    
    generateOptimizationCommands() {
        console.log('\n🛠️  Asset Optimization Commands (Execute manually):');
        console.log('═══════════════════════════════════════════════════════');
        
        // FFmpeg commands for video optimization
        const videoCommands = [
            {
                name: 'Hero Video Optimization',
                command: `ffmpeg -i "KakaoTalk_20250814_145521290.mp4" -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" "assets/videos/hero-cyberpunk-optimized.mp4"`
            },
            {
                name: 'Transformation Video Optimization',
                command: `ffmpeg -i "KakaoTalk_20250814_145511097.mp4" -c:v libx264 -crf 25 -preset medium -c:a aac -b:a 96k -vf "scale=1200:800:force_original_aspect_ratio=decrease" "assets/videos/ai-transformation-intro.mp4"`
            },
            {
                name: 'DTG Demo Video Optimization',
                command: `ffmpeg -i "0819 (1).mp4" -c:v libx264 -crf 24 -preset medium -c:a aac -b:a 96k -vf "scale=800:600:force_original_aspect_ratio=decrease" "assets/videos/glec-dtg-product-demo.mp4"`
            },
            {
                name: 'Dashboard Demo Video Optimization',
                command: `ffmpeg -i "화면 기록 2025-08-14 오후 5.51.51.mov" -c:v libx264 -crf 24 -preset medium -c:a aac -b:a 96k -vf "scale=800:600:force_original_aspect_ratio=decrease" "assets/videos/glec-dashboard-demo.mp4"`
            }
        ];
        
        videoCommands.forEach((cmd, index) => {
            console.log(`\n${index + 1}. ${cmd.name}:`);
            console.log(`   ${cmd.command}`);
        });
        
        // ImageMagick commands for image optimization
        console.log('\n🖼️  Image Optimization Commands:');
        console.log('═══════════════════════════════════════');
        
        const imageCommands = [
            {
                name: 'DTG Hero Image',
                commands: [
                    `convert "그림1 (1).png" -resize 800x600> -quality 85 "assets/images/glec-dtg-hero.jpg"`,
                    `convert "assets/images/glec-dtg-hero.jpg" -quality 85 "assets/images/glec-dtg-hero.webp"`
                ]
            },
            {
                name: 'Dashboard Hero Image',
                commands: [
                    `convert "image (1).png" -resize 800x600> -quality 85 "assets/images/glec-dashboard-hero.jpg"`,
                    `convert "assets/images/glec-dashboard-hero.jpg" -quality 85 "assets/images/glec-dashboard-hero.webp"`
                ]
            }
        ];
        
        imageCommands.forEach((cmd, index) => {
            console.log(`\n${index + 1}. ${cmd.name}:`);
            cmd.commands.forEach(command => {
                console.log(`   ${command}`);
            });
        });
        
        console.log('\n📝 Prerequisites:');
        console.log('   - Install FFmpeg: https://ffmpeg.org/download.html');
        console.log('   - Install ImageMagick: https://imagemagick.org/script/download.php');
        console.log('   - Or use online tools for conversion');
        
        console.log('\n🚀 After optimization:');
        console.log('   1. Update file paths in glec-integrated-showcase.html');
        console.log('   2. Test loading performance');
        console.log('   3. Verify video playback on all devices');
        console.log('   4. Deploy to production CDN');
    }
}

// Execute the optimization planning
async function main() {
    const optimizer = new GLECAssetOptimizer();
    await optimizer.initialize();
    optimizer.generateOptimizationCommands();
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Execute the optimization commands above');
    console.log('2. Update file paths in the HTML file');
    console.log('3. Test the optimized showcase');
    console.log('4. Deploy for world-class performance!');
}

main().catch(console.error);