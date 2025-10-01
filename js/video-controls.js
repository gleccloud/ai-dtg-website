/**
 * GLEC Video Controls
 * 비디오 재생 제어를 위한 전역 함수들
 */

// 비디오 재생 함수
function playVideo(videoId) {
    const video = document.getElementById(videoId);
    if (video) {
        const container = video.closest('.glec-video-container');
        
        // 재생 상태로 변경
        if (container) {
            container.classList.add('playing');
        }
        
        // 비디오 재생
        video.play().then(() => {
            console.log(`Video ${videoId} started playing`);
        }).catch(error => {
            console.error(`Failed to play video ${videoId}:`, error);
            // 재생 실패 시 재생 상태 제거
            if (container) {
                container.classList.remove('playing');
            }
        });
    }
}

// 비디오 일시정지 함수
function pauseVideo(videoId) {
    const video = document.getElementById(videoId);
    if (video) {
        const container = video.closest('.glec-video-container');
        
        // 재생 상태 제거
        if (container) {
            container.classList.remove('playing');
        }
        
        video.pause();
        console.log(`Video ${videoId} paused`);
    }
}

// 모든 비디오 일시정지
function pauseAllVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        const container = video.closest('.glec-video-container');
        if (container) {
            container.classList.remove('playing');
        }
        video.pause();
    });
    console.log('All videos paused');
}

// 비디오 재생 속도 조절
function setVideoSpeed(videoId, speed) {
    const video = document.getElementById(videoId);
    if (video) {
        video.playbackRate = speed;
        console.log(`Video ${videoId} speed set to ${speed}x`);
    }
}

// 비디오 음소거/음소거 해제
function toggleVideoMute(videoId) {
    const video = document.getElementById(videoId);
    if (video) {
        video.muted = !video.muted;
        console.log(`Video ${videoId} muted: ${video.muted}`);
    }
}

// 비디오 전체화면
function toggleVideoFullscreen(videoId) {
    const video = document.getElementById(videoId);
    if (video) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            video.requestFullscreen().catch(error => {
                console.error('Failed to enter fullscreen:', error);
            });
        }
    }
}

// 스크롤 기반 자동 재생 토글
function toggleScrollAutoPlay() {
    if (window.glecScrollVideoController) {
        const isEnabled = !window.glecScrollVideoController.isAutoPlayEnabled;
        window.glecScrollVideoController.toggleAutoPlay(isEnabled);
        console.log(`Scroll auto-play ${isEnabled ? 'enabled' : 'disabled'}`);
    }
}

// 비디오 프레임 스크롤 제어 활성화/비활성화
function toggleFrameControl() {
    if (window.glecScrollVideoController) {
        const isEnabled = !window.glecScrollVideoController.isFrameControlEnabled;
        window.glecScrollVideoController.toggleFrameControl(isEnabled);
        console.log(`Frame control ${isEnabled ? 'enabled' : 'disabled'}`);
    }
}

// 디버그 정보 출력
function showVideoDebugInfo() {
    if (window.glecScrollVideoController) {
        const info = window.glecScrollVideoController.getDebugInfo();
        console.log('Video Debug Info:', info);
        return info;
    }
    return null;
}

// 페이지 로드 시 모든 비디오에 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // 비디오 로드 완료 시
        video.addEventListener('loadeddata', () => {
            console.log(`Video ${video.id || 'unnamed'} loaded successfully`);
        });
        
        // 비디오 재생 시작 시
        video.addEventListener('play', () => {
            const container = video.closest('.glec-video-container');
            if (container) {
                container.classList.add('playing');
            }
        });
        
        // 비디오 일시정지 시
        video.addEventListener('pause', () => {
            const container = video.closest('.glec-video-container');
            if (container) {
                container.classList.remove('playing');
            }
        });
        
        // 비디오 종료 시
        video.addEventListener('ended', () => {
            const container = video.closest('.glec-video-container');
            if (container) {
                container.classList.remove('playing');
            }
        });
        
        // 비디오 오류 시
        video.addEventListener('error', (e) => {
            const container = video.closest('.glec-video-container');
            if (container) {
                container.classList.add('error');
            }
            console.error(`Video ${video.id || 'unnamed'} error:`, e);
        });
    });
    
    console.log('GLEC Video Controls initialized');
}); 