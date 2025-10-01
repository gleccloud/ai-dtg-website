/**
 * GLEC Scroll-Based Video Control System
 * 스크롤 속도와 영상 재생 프레임을 일치시키는 시스템
 */

class GLECScrollVideoController {
    constructor() {
        this.videos = new Map();
        this.scrollData = {
            lastScrollTop: 0,
            scrollSpeed: 0,
            lastScrollTime: Date.now()
        };
        this.isInitialized = false;
        this.init();
    }

    init() {
        this.setupScrollListener();
        this.setupVideoElements();
        this.isInitialized = true;
        console.log('GLEC Scroll Video Controller initialized');
    }

    setupScrollListener() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            const currentTime = Date.now();
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 스크롤 속도 계산
            const timeDiff = currentTime - this.scrollData.lastScrollTime;
            const scrollDiff = currentScrollTop - this.scrollData.lastScrollTop;
            this.scrollData.scrollSpeed = Math.abs(scrollDiff / timeDiff) * 1000; // 픽셀/초
            
            this.scrollData.lastScrollTop = currentScrollTop;
            this.scrollData.lastScrollTime = currentTime;
            
            // 스크롤 이벤트 디바운싱
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateAllVideos();
            }, 16); // 60fps
        });
    }

    setupVideoElements() {
        // 모든 비디오 요소 찾기
        const videoElements = document.querySelectorAll('video');
        
        videoElements.forEach((video, index) => {
            const videoId = video.id || `video-${index}`;
            const videoData = {
                element: video,
                duration: 0,
                currentTime: 0,
                isPlaying: false,
                scrollRatio: 0,
                lastFrameTime: 0
            };
            
            // 비디오 메타데이터 로드 대기
            video.addEventListener('loadedmetadata', () => {
                videoData.duration = video.duration;
                console.log(`Video ${videoId} loaded: duration = ${videoData.duration}s`);
            });
            
            // 비디오 재생 상태 모니터링
            video.addEventListener('play', () => {
                videoData.isPlaying = true;
            });
            
            video.addEventListener('pause', () => {
                videoData.isPlaying = false;
            });
            
            video.addEventListener('timeupdate', () => {
                videoData.currentTime = video.currentTime;
            });
            
            this.videos.set(videoId, videoData);
        });
    }

    updateAllVideos() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        this.videos.forEach((videoData, videoId) => {
            this.updateVideoFrame(videoData, scrollTop, windowHeight, documentHeight);
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
            
            // 스크롤 속도에 따른 프레임 스킵
            const frameSkip = this.calculateFrameSkip();
            
            if (Math.abs(targetTime - video.currentTime) > frameSkip) {
                video.currentTime = targetTime;
                videoData.currentTime = targetTime;
            }
            
            // 스크롤 속도가 빠를 때 자동 재생
            if (this.scrollData.scrollSpeed > 100 && !videoData.isPlaying) {
                video.play().catch(e => console.log('Auto-play prevented:', e));
            }
            
            // 스크롤이 멈춰있을 때 일시정지
            if (this.scrollData.scrollSpeed < 10 && videoData.isPlaying) {
                video.pause();
            }
        }
    }

    calculateFrameSkip() {
        // 스크롤 속도에 따른 프레임 스킵 계산
        const baseFrameSkip = 0.1; // 기본 0.1초
        const speedMultiplier = Math.min(this.scrollData.scrollSpeed / 100, 2); // 최대 2배
        return baseFrameSkip * speedMultiplier;
    }

    // 특정 비디오의 재생 속도 조절
    setVideoPlaybackRate(videoId, rate) {
        const videoData = this.videos.get(videoId);
        if (videoData) {
            videoData.element.playbackRate = rate;
        }
    }

    // 모든 비디오 일시정지
    pauseAllVideos() {
        this.videos.forEach(videoData => {
            if (videoData.isPlaying) {
                videoData.element.pause();
            }
        });
    }

    // 모든 비디오 재생
    playAllVideos() {
        this.videos.forEach(videoData => {
            if (!videoData.isPlaying) {
                videoData.element.play().catch(e => console.log('Play failed:', e));
            }
        });
    }

    // 스크롤 기반 자동 재생 활성화/비활성화
    toggleAutoPlay(enabled) {
        this.videos.forEach(videoData => {
            videoData.element.autoplay = enabled;
            videoData.element.muted = enabled; // 자동재생을 위해 음소거
        });
    }

    // 디버그 정보 출력
    getDebugInfo() {
        return {
            totalVideos: this.videos.size,
            scrollSpeed: this.scrollData.scrollSpeed,
            scrollTop: this.scrollData.lastScrollTop,
            videos: Array.from(this.videos.entries()).map(([id, data]) => ({
                id,
                currentTime: data.currentTime,
                duration: data.duration,
                isPlaying: data.isPlaying
            }))
        };
    }
}

// 페이지 로드 완료 후 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.glecScrollVideoController = new GLECScrollVideoController();
});

// 전역 함수로 노출
window.GLECScrollVideoController = GLECScrollVideoController; 