/**
 * GLEC Advanced Scroll-Based Video Frame Control System
 * 스크롤 속도에 맞춰 영상 프레임이 재생되는 고급 애니메이션 시스템
 */

class GLECAdvancedScrollVideoController {
    constructor() {
        this.videos = new Map();
        this.scrollData = {
            lastScrollTop: 0,
            scrollSpeed: 0,
            lastScrollTime: Date.now(),
            scrollDirection: 'down',
            scrollAcceleration: 0
        };
        this.animationFrame = null;
        this.isInitialized = false;
        this.debugMode = false;
        this.init();
    }

    init() {
        this.setupScrollListener();
        this.setupVideoElements();
        this.setupIntersectionObserver();
        this.startAnimationLoop();
        this.isInitialized = true;
        console.log('GLEC Advanced Scroll Video Controller initialized');
    }

    setupScrollListener() {
        let scrollTimeout;
        let lastScrollTop = 0;
        let scrollCount = 0;
        
        window.addEventListener('scroll', () => {
            const currentTime = Date.now();
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 스크롤 방향 감지
            this.scrollData.scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
            
            // 스크롤 속도 계산 (픽셀/초)
            const timeDiff = currentTime - this.scrollData.lastScrollTime;
            const scrollDiff = Math.abs(currentScrollTop - this.scrollData.lastScrollTop);
            this.scrollData.scrollSpeed = scrollDiff / timeDiff * 1000;
            
            // 스크롤 가속도 계산
            const speedDiff = this.scrollData.scrollSpeed - (this.scrollData.lastScrollSpeed || 0);
            this.scrollData.scrollAcceleration = speedDiff / timeDiff;
            
            // 스크롤 카운터 (연속 스크롤 감지)
            if (Math.abs(currentScrollTop - lastScrollTop) > 5) {
                scrollCount++;
            } else {
                scrollCount = Math.max(0, scrollCount - 1);
            }
            
            this.scrollData.lastScrollTop = currentScrollTop;
            this.scrollData.lastScrollTime = currentTime;
            this.scrollData.lastScrollSpeed = this.scrollData.scrollSpeed;
            
            // 스크롤 이벤트 디바운싱
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateAllVideos();
            }, 16); // 60fps
        });
    }

    setupVideoElements() {
        const videoElements = document.querySelectorAll('video');
        
        videoElements.forEach((video, index) => {
            const videoId = video.id || `video-${index}`;
            const videoData = {
                element: video,
                duration: 0,
                currentTime: 0,
                isPlaying: false,
                scrollRatio: 0,
                lastFrameTime: 0,
                frameRate: 30, // 기본 30fps
                scrollSensitivity: 1.0,
                frameSkipThreshold: 0.05,
                isScrollControlled: true
            };
            
            // 비디오 메타데이터 로드 대기
            video.addEventListener('loadedmetadata', () => {
                videoData.duration = video.duration;
                videoData.frameRate = this.calculateFrameRate(video);
                console.log(`Video ${videoId} loaded: duration = ${videoData.duration}s, frameRate = ${videoData.frameRate}fps`);
            });
            
            // 비디오 재생 상태 모니터링
            video.addEventListener('play', () => {
                videoData.isPlaying = true;
                this.addFrameAdvanceClass(video);
            });
            
            video.addEventListener('pause', () => {
                videoData.isPlaying = false;
                this.removeFrameAdvanceClass(video);
            });
            
            video.addEventListener('timeupdate', () => {
                videoData.currentTime = video.currentTime;
            });
            
            this.videos.set(videoId, videoData);
        });
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, options);

        // 스크롤 애니메이션 요소들 관찰
        document.querySelectorAll('.glec-scroll-animate').forEach(el => {
            observer.observe(el);
        });
    }

    startAnimationLoop() {
        const animate = () => {
            this.updateAllVideos();
            this.updateScrollProgress();
            this.animationFrame = requestAnimationFrame(animate);
        };
        animate();
    }

    updateAllVideos() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        this.videos.forEach((videoData, videoId) => {
            if (videoData.isScrollControlled) {
                this.updateVideoFrame(videoData, scrollTop, windowHeight, documentHeight);
            }
        });
    }

    updateVideoFrame(videoData, scrollTop, windowHeight, documentHeight) {
        const video = videoData.element;
        const videoRect = video.getBoundingClientRect();
        
        // 비디오가 뷰포트에 보이는지 확인
        if (videoRect.bottom < 0 || videoRect.top > windowHeight) {
            return;
        }
        
        // 스크롤 위치에 따른 비디오 프레임 계산
        const videoTop = video.offsetTop;
        const videoHeight = video.offsetHeight;
        const scrollProgress = (scrollTop - videoTop + windowHeight) / (videoHeight + windowHeight);
        
        // 스크롤 진행률을 0-1 범위로 제한
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // 비디오 재생 시간 계산
        if (videoData.duration > 0) {
            const targetTime = clampedProgress * videoData.duration;
            
            // 스크롤 속도에 따른 프레임 스킵 계산
            const frameSkip = this.calculateFrameSkip(videoData);
            
            // 프레임 변경이 필요한 경우에만 업데이트
            if (Math.abs(targetTime - video.currentTime) > frameSkip) {
                video.currentTime = targetTime;
                videoData.currentTime = targetTime;
                
                // 프레임 어드밴스 애니메이션 추가
                this.addFrameAdvanceAnimation(video);
            }
            
            // 스크롤 속도에 따른 자동 재생/일시정지
            this.controlVideoPlayback(videoData);
        }
    }

    calculateFrameSkip(videoData) {
        const baseFrameSkip = videoData.frameSkipThreshold;
        const speedMultiplier = Math.min(this.scrollData.scrollSpeed / 100, 3); // 최대 3배
        const accelerationMultiplier = Math.min(Math.abs(this.scrollData.scrollAcceleration) / 1000, 2);
        
        return baseFrameSkip * speedMultiplier * accelerationMultiplier;
    }

    controlVideoPlayback(videoData) {
        const video = videoData.element;
        const speed = this.scrollData.scrollSpeed;
        
        // 스크롤 속도가 빠를 때 자동 재생
        if (speed > 150 && !videoData.isPlaying) {
            video.play().catch(e => console.log('Auto-play prevented:', e));
        }
        
        // 스크롤이 멈춰있을 때 일시정지
        if (speed < 20 && videoData.isPlaying) {
            video.pause();
        }
        
        // 스크롤 방향에 따른 재생 속도 조절
        if (speed > 50) {
            const playbackRate = Math.min(speed / 100, 2.0);
            video.playbackRate = playbackRate;
        } else {
            video.playbackRate = 1.0;
        }
    }

    calculateFrameRate(video) {
        // 비디오의 프레임 레이트를 추정 (정확한 값은 메타데이터에 따라 다름)
        return 30; // 기본값
    }

    addFrameAdvanceAnimation(video) {
        video.classList.add('glec-frame-advance');
        setTimeout(() => {
            video.classList.remove('glec-frame-advance');
        }, 100);
    }

    addFrameAdvanceClass(video) {
        video.classList.add('glec-scroll-video');
    }

    removeFrameAdvanceClass(video) {
        video.classList.remove('glec-scroll-video');
    }

    updateScrollProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        
        const progressBar = document.querySelector('.glec-scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${scrollPercentage}%`;
        }
    }

    // 특정 비디오의 스크롤 제어 활성화/비활성화
    toggleVideoScrollControl(videoId, enabled) {
        const videoData = this.videos.get(videoId);
        if (videoData) {
            videoData.isScrollControlled = enabled;
            console.log(`Video ${videoId} scroll control ${enabled ? 'enabled' : 'disabled'}`);
        }
    }

    // 스크롤 민감도 조절
    setVideoScrollSensitivity(videoId, sensitivity) {
        const videoData = this.videos.get(videoId);
        if (videoData) {
            videoData.scrollSensitivity = Math.max(0.1, Math.min(5.0, sensitivity));
            console.log(`Video ${videoId} scroll sensitivity set to ${videoData.scrollSensitivity}`);
        }
    }

    // 프레임 스킵 임계값 조절
    setVideoFrameSkipThreshold(videoId, threshold) {
        const videoData = this.videos.get(videoId);
        if (videoData) {
            videoData.frameSkipThreshold = Math.max(0.01, Math.min(1.0, threshold));
            console.log(`Video ${videoId} frame skip threshold set to ${videoData.frameSkipThreshold}`);
        }
    }

    // 디버그 모드 토글
    toggleDebugMode() {
        this.debugMode = !this.debugMode;
        console.log(`Debug mode ${this.debugMode ? 'enabled' : 'disabled'}`);
        
        if (this.debugMode) {
            this.showDebugInfo();
        }
    }

    // 디버그 정보 출력
    showDebugInfo() {
        if (!this.debugMode) return;
        
        const info = this.getDebugInfo();
        console.log('=== GLEC Scroll Video Debug Info ===');
        console.log('Scroll Data:', info.scrollData);
        console.log('Videos:', info.videos);
        console.log('Performance:', info.performance);
        
        // 화면에 디버그 정보 표시
        this.displayDebugInfo(info);
    }

    getDebugInfo() {
        return {
            scrollData: {
                speed: this.scrollData.scrollSpeed,
                direction: this.scrollData.scrollDirection,
                acceleration: this.scrollData.scrollAcceleration,
                scrollTop: this.scrollData.lastScrollTop
            },
            videos: Array.from(this.videos.entries()).map(([id, data]) => ({
                id,
                currentTime: data.currentTime,
                duration: data.duration,
                isPlaying: data.isPlaying,
                scrollSensitivity: data.scrollSensitivity,
                frameSkipThreshold: data.frameSkipThreshold
            })),
            performance: {
                totalVideos: this.videos.size,
                animationFrame: this.animationFrame ? 'Running' : 'Stopped'
            }
        };
    }

    displayDebugInfo(info) {
        let debugDiv = document.getElementById('glec-debug-info');
        if (!debugDiv) {
            debugDiv = document.createElement('div');
            debugDiv.id = 'glec-debug-info';
            debugDiv.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.8);
                color: var(--glec-gold);
                padding: 10px;
                border-radius: 5px;
                font-family: monospace;
                font-size: 12px;
                z-index: 10000;
                max-width: 300px;
            `;
            document.body.appendChild(debugDiv);
        }
        
        debugDiv.innerHTML = `
            <div><strong>Scroll Speed:</strong> ${Math.round(info.scrollData.speed)}px/s</div>
            <div><strong>Direction:</strong> ${info.scrollData.direction}</div>
            <div><strong>Videos:</strong> ${info.videos.length}</div>
            <div><strong>FPS:</strong> ${Math.round(1000 / 16)}</div>
        `;
    }

    // 정리
    destroy() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        this.videos.clear();
        this.isInitialized = false;
        console.log('GLEC Advanced Scroll Video Controller destroyed');
    }
}

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.glecAdvancedScrollVideoController = new GLECAdvancedScrollVideoController();
    
    // 전역 함수로 노출
    window.GLECAdvancedScrollVideoController = GLECAdvancedScrollVideoController;
    
    // 디버그 모드 토글 (개발용)
    window.toggleVideoDebug = () => {
        if (window.glecAdvancedScrollVideoController) {
            window.glecAdvancedScrollVideoController.toggleDebugMode();
        }
    };
}); 