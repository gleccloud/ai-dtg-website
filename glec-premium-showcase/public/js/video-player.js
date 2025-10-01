/**
 * GLEC AI DTG Premium Showcase - Advanced Video Player System
 * World-Class Commercial-Grade Video Playback with Interactive Controls
 */
export class GLECVideoPlayer {
    constructor(config) {
        this.isFullscreen = false;
        this.isInitialized = false;
        this.qualityLevels = [];
        this.playbackRates = [];
        this.currentQuality = 'auto';
        this.currentPlaybackRate = 1;
        this.volumeBeforeMute = 1;
        this.muted = false;
        this.video = config.element;
        this.config = config;
        this.container = this.createContainer();
        this.initializePlayer();
    }
    /**
     * Initialize video player
     */
    initializePlayer() {
        if (this.isInitialized)
            return;
        this.setupVideoElement();
        this.createControls();
        this.setupEventListeners();
        this.setupQualityLevels();
        this.setupPlaybackRates();
        this.applyConfig();
        this.isInitialized = true;
        if (this.config.onReady) {
            this.config.onReady();
        }
    }
    /**
     * Setup video element properties
     */
    setupVideoElement() {
        this.video.autoplay = this.config.autoplay || false;
        this.video.muted = this.config.muted || false;
        this.video.loop = this.config.loop || false;
        this.video.controls = false; // We'll use custom controls
        this.video.preload = this.config.preload || 'metadata';
        if (this.config.poster) {
            this.video.poster = this.config.poster;
        }
        // Set aspect ratio
        this.setAspectRatio();
    }
    /**
     * Set video aspect ratio
     */
    setAspectRatio() {
        const aspectRatio = this.config.aspectRatio || '16:9';
        let ratio = 16 / 9;
        switch (aspectRatio) {
            case '4:3':
                ratio = 4 / 3;
                break;
            case '1:1':
                ratio = 1;
                break;
            case 'custom':
                if (this.config.customAspectRatio) {
                    ratio = this.config.customAspectRatio.width / this.config.customAspectRatio.height;
                }
                break;
        }
        this.container.style.aspectRatio = ratio.toString();
    }
    /**
     * Create player container
     */
    createContainer() {
        const container = document.createElement('div');
        container.className = 'glec-video-player';
        container.style.cssText = `
      position: relative;
      width: 100%;
      max-width: 100%;
      background: #000;
      border-radius: var(--glec-border-radius-lg);
      overflow: hidden;
      box-shadow: var(--glec-shadow-xl);
    `;
        // Insert container before video element
        this.video.parentNode?.insertBefore(container, this.video);
        container.appendChild(this.video);
        return container;
    }
    /**
     * Create custom video controls
     */
    createControls() {
        this.controls = document.createElement('div');
        this.controls.className = 'glec-video-controls';
        this.controls.style.cssText = `
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0,0,0,0.8));
      padding: 20px;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 10;
    `;
        this.createProgressBar();
        this.createTimeDisplay();
        this.createControlButtons();
        this.createVolumeControl();
        this.createQualitySelector();
        this.createPlaybackRateSelector();
        this.container.appendChild(this.controls);
        this.setupControlVisibility();
    }
    /**
     * Create progress bar
     */
    createProgressBar() {
        this.progressBar = document.createElement('div');
        this.progressBar.className = 'glec-video-progress';
        this.progressBar.style.cssText = `
      width: 100%;
      height: 4px;
      background: rgba(255,255,255,0.3);
      border-radius: 2px;
      cursor: pointer;
      margin-bottom: 15px;
      position: relative;
    `;
        const progressFill = document.createElement('div');
        progressFill.className = 'glec-video-progress-fill';
        progressFill.style.cssText = `
      height: 100%;
      background: var(--glec-primary);
      border-radius: 2px;
      width: 0%;
      transition: width 0.1s ease;
    `;
        this.progressBar.appendChild(progressFill);
        this.controls.appendChild(this.progressBar);
    }
    /**
     * Create time display
     */
    createTimeDisplay() {
        this.timeDisplay = document.createElement('div');
        this.timeDisplay.className = 'glec-video-time';
        this.timeDisplay.style.cssText = `
      color: white;
      font-size: 14px;
      font-family: var(--glec-font-mono);
      margin-bottom: 15px;
    `;
        this.timeDisplay.textContent = '0:00 / 0:00';
        this.controls.appendChild(this.timeDisplay);
    }
    /**
     * Create control buttons
     */
    createControlButtons() {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
      display: flex;
      align-items: center;
      gap: 15px;
    `;
        // Play/Pause button
        this.playPauseButton = document.createElement('button');
        this.playPauseButton.className = 'glec-video-btn glec-video-play-pause';
        this.playPauseButton.innerHTML = '▶';
        this.playPauseButton.style.cssText = `
      background: var(--glec-primary);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: all 0.2s ease;
    `;
        // Fullscreen button
        this.fullscreenButton = document.createElement('button');
        this.fullscreenButton.className = 'glec-video-btn glec-video-fullscreen';
        this.fullscreenButton.innerHTML = '⛶';
        this.fullscreenButton.style.cssText = `
      background: rgba(255,255,255,0.2);
      color: white;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: all 0.2s ease;
    `;
        buttonContainer.appendChild(this.playPauseButton);
        buttonContainer.appendChild(this.fullscreenButton);
        this.controls.appendChild(buttonContainer);
    }
    /**
     * Create volume control
     */
    createVolumeControl() {
        this.volumeControl = document.createElement('div');
        this.volumeControl.className = 'glec-video-volume';
        this.volumeControl.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
    `;
        const volumeIcon = document.createElement('span');
        volumeIcon.innerHTML = '🔊';
        volumeIcon.style.cssText = `
      color: white;
      font-size: 16px;
      cursor: pointer;
    `;
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.min = '0';
        volumeSlider.max = '1';
        volumeSlider.step = '0.1';
        volumeSlider.value = '1';
        volumeSlider.style.cssText = `
      width: 80px;
      height: 4px;
      background: rgba(255,255,255,0.3);
      border-radius: 2px;
      outline: none;
      cursor: pointer;
    `;
        this.volumeControl.appendChild(volumeIcon);
        this.volumeControl.appendChild(volumeSlider);
        this.controls.appendChild(this.volumeControl);
    }
    /**
     * Create quality selector
     */
    createQualitySelector() {
        this.qualitySelector = document.createElement('div');
        this.qualitySelector.className = 'glec-video-quality';
        this.qualitySelector.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
    `;
        const qualityLabel = document.createElement('span');
        qualityLabel.textContent = 'Quality:';
        qualityLabel.style.cssText = `
      color: white;
      font-size: 12px;
    `;
        const qualitySelect = document.createElement('select');
        qualitySelect.style.cssText = `
      background: rgba(255,255,255,0.2);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 4px 8px;
      font-size: 12px;
      cursor: pointer;
    `;
        this.qualitySelector.appendChild(qualityLabel);
        this.qualitySelector.appendChild(qualitySelect);
        this.controls.appendChild(this.qualitySelector);
    }
    /**
     * Create playback rate selector
     */
    createPlaybackRateSelector() {
        this.playbackRateSelector = document.createElement('div');
        this.playbackRateSelector.className = 'glec-video-playback-rate';
        this.playbackRateSelector.style.cssText = `
      display: flex;
      align-items: center;
      gap: 10px;
    `;
        const rateLabel = document.createElement('span');
        rateLabel.textContent = 'Speed:';
        rateLabel.style.cssText = `
      color: white;
      font-size: 12px;
    `;
        const rateSelect = document.createElement('select');
        rateSelect.style.cssText = `
      background: rgba(255,255,255,0.2);
      color: white;
      border: none;
      border-radius: 4px;
      padding: 4px 8px;
      font-size: 12px;
      cursor: pointer;
    `;
        this.playbackRateSelector.appendChild(rateLabel);
        this.playbackRateSelector.appendChild(rateSelect);
        this.controls.appendChild(this.playbackRateSelector);
    }
    /**
     * Setup control visibility
     */
    setupControlVisibility() {
        let hideTimeout;
        const showControls = () => {
            this.controls.style.opacity = '1';
            clearTimeout(hideTimeout);
            hideTimeout = window.setTimeout(() => {
                if (!this.video.paused) {
                    this.controls.style.opacity = '0';
                }
            }, 3000);
        };
        const hideControls = () => {
            this.controls.style.opacity = '0';
        };
        this.container.addEventListener('mousemove', showControls);
        this.container.addEventListener('mouseleave', hideControls);
        this.container.addEventListener('click', showControls);
    }
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Video events
        this.video.addEventListener('play', () => {
            this.updatePlayPauseButton();
            if (this.config.onPlay)
                this.config.onPlay();
        });
        this.video.addEventListener('pause', () => {
            this.updatePlayPauseButton();
            if (this.config.onPause)
                this.config.onPause();
        });
        this.video.addEventListener('ended', () => {
            if (this.config.onEnded)
                this.config.onEnded();
        });
        this.video.addEventListener('error', (error) => {
            if (this.config.onError)
                this.config.onError(error);
        });
        this.video.addEventListener('timeupdate', () => {
            this.updateProgress();
            this.updateTimeDisplay();
            if (this.config.onTimeUpdate) {
                this.config.onTimeUpdate(this.video.currentTime, this.video.duration);
            }
        });
        this.video.addEventListener('volumechange', () => {
            if (this.config.onVolumeChange) {
                this.config.onVolumeChange(this.video.volume);
            }
        });
        // Control events
        this.playPauseButton.addEventListener('click', () => this.togglePlayPause());
        this.fullscreenButton.addEventListener('click', () => this.toggleFullscreen());
        this.progressBar.addEventListener('click', (e) => this.seekTo(e));
        const volumeSlider = this.volumeControl.querySelector('input');
        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                const target = e.target;
                this.setVolume(parseFloat(target.value));
            });
        }
        const qualitySelect = this.qualitySelector.querySelector('select');
        if (qualitySelect) {
            qualitySelect.addEventListener('change', (e) => {
                const target = e.target;
                this.setQuality(target.value);
            });
        }
        const rateSelect = this.playbackRateSelector.querySelector('select');
        if (rateSelect) {
            rateSelect.addEventListener('change', (e) => {
                const target = e.target;
                this.setPlaybackRate(parseFloat(target.value));
            });
        }
    }
    /**
     * Setup quality levels
     */
    setupQualityLevels() {
        this.qualityLevels = [
            { label: 'Auto', value: 'auto', width: 0, height: 0 },
            { label: '1080p', value: '1080p', width: 1920, height: 1080 },
            { label: '720p', value: '720p', width: 1280, height: 720 },
            { label: '480p', value: '480p', width: 854, height: 480 },
            { label: '360p', value: '360p', width: 640, height: 360 }
        ];
        const qualitySelect = this.qualitySelector.querySelector('select');
        if (qualitySelect) {
            this.qualityLevels.forEach(quality => {
                const option = document.createElement('option');
                option.value = quality.value;
                option.textContent = quality.label;
                qualitySelect.appendChild(option);
            });
        }
    }
    /**
     * Setup playback rates
     */
    setupPlaybackRates() {
        this.playbackRates = [
            { label: '0.5x', value: 0.5 },
            { label: '0.75x', value: 0.75 },
            { label: '1x', value: 1 },
            { label: '1.25x', value: 1.25 },
            { label: '1.5x', value: 1.5 },
            { label: '2x', value: 2 }
        ];
        const rateSelect = this.playbackRateSelector.querySelector('select');
        if (rateSelect) {
            this.playbackRates.forEach(rate => {
                const option = document.createElement('option');
                option.value = rate.value.toString();
                option.textContent = rate.label;
                if (rate.value === 1)
                    option.selected = true;
                rateSelect.appendChild(option);
            });
        }
    }
    /**
     * Apply configuration
     */
    applyConfig() {
        if (this.config.volume !== undefined) {
            this.setVolume(this.config.volume);
        }
        if (this.config.playbackRate !== undefined) {
            this.setPlaybackRate(this.config.playbackRate);
        }
        if (this.config.quality) {
            this.setQuality(this.config.quality);
        }
    }
    /**
     * Update play/pause button
     */
    updatePlayPauseButton() {
        if (this.video.paused) {
            this.playPauseButton.innerHTML = '▶';
        }
        else {
            this.playPauseButton.innerHTML = '⏸';
        }
    }
    /**
     * Update progress bar
     */
    updateProgress() {
        const progressFill = this.progressBar.querySelector('.glec-video-progress-fill');
        if (progressFill && this.video.duration) {
            const progress = (this.video.currentTime / this.video.duration) * 100;
            progressFill.style.width = `${progress}%`;
        }
    }
    /**
     * Update time display
     */
    updateTimeDisplay() {
        const currentTime = this.formatTime(this.video.currentTime);
        const duration = this.formatTime(this.video.duration);
        this.timeDisplay.textContent = `${currentTime} / ${duration}`;
    }
    /**
     * Format time in MM:SS format
     */
    formatTime(seconds) {
        if (isNaN(seconds))
            return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    /**
     * Toggle play/pause
     */
    togglePlayPause() {
        if (this.video.paused) {
            this.video.play();
        }
        else {
            this.video.pause();
        }
    }
    /**
     * Toggle fullscreen
     */
    toggleFullscreen() {
        if (!this.isFullscreen) {
            if (this.container.requestFullscreen) {
                this.container.requestFullscreen();
            }
        }
        else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }
    /**
     * Seek to position
     */
    seekTo(event) {
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const percentage = clickX / rect.width;
        const seekTime = percentage * this.video.duration;
        this.video.currentTime = seekTime;
    }
    /**
     * Set volume
     */
    setVolume(volume) {
        this.video.volume = Math.max(0, Math.min(1, volume));
        this.updateVolumeUI();
    }
    /**
     * Update volume UI
     */
    updateVolumeUI() {
        const volumeSlider = this.volumeControl.querySelector('input');
        if (volumeSlider) {
            volumeSlider.value = this.video.volume.toString();
        }
        const volumeIcon = this.volumeControl.querySelector('span');
        if (volumeIcon) {
            if (this.video.volume === 0) {
                volumeIcon.innerHTML = '🔇';
            }
            else if (this.video.volume < 0.5) {
                volumeIcon.innerHTML = '🔉';
            }
            else {
                volumeIcon.innerHTML = '🔊';
            }
        }
    }
    /**
     * Set quality
     */
    setQuality(quality) {
        this.currentQuality = quality;
        // In a real implementation, this would switch video sources
        if (this.config.onQualityChange) {
            this.config.onQualityChange(quality);
        }
    }
    /**
     * Set playback rate
     */
    setPlaybackRate(rate) {
        this.video.playbackRate = rate;
        this.currentPlaybackRate = rate;
    }
    /**
     * Play video
     */
    play() {
        return this.video.play();
    }
    /**
     * Pause video
     */
    pause() {
        this.video.pause();
    }
    /**
     * Get current time
     */
    getCurrentTime() {
        return this.video.currentTime;
    }
    /**
     * Get duration
     */
    getDuration() {
        return this.video.duration;
    }
    /**
     * Get volume
     */
    getVolume() {
        return this.video.volume;
    }
    /**
     * Get playback rate
     */
    getPlaybackRate() {
        return this.video.playbackRate;
    }
    /**
     * Get quality
     */
    getQuality() {
        return this.currentQuality;
    }
    /**
     * Check if video is playing
     */
    isPlaying() {
        return !this.video.paused && !this.video.ended;
    }
    /**
     * Check if video is paused
     */
    isPaused() {
        return this.video.paused;
    }
    /**
     * Check if video is ended
     */
    isEnded() {
        return this.video.ended;
    }
    /**
     * Check if video is muted
     */
    isMuted() {
        return this.muted;
    }
    /**
     * Mute/unmute video
     */
    toggleMute() {
        if (this.video.muted) {
            this.video.muted = false;
            this.setVolume(this.volumeBeforeMute);
        }
        else {
            this.volumeBeforeMute = this.video.volume;
            this.video.muted = true;
            this.setVolume(0);
        }
    }
    /**
     * Destroy player
     */
    destroy() {
        this.video.pause();
        this.video.removeAttribute('src');
        this.video.load();
        if (this.container.parentNode) {
            this.container.parentNode.insertBefore(this.video, this.container);
            this.container.remove();
        }
        this.isInitialized = false;
    }
}
// Export utility functions
export const createVideoPlayer = (config) => new GLECVideoPlayer(config);
export const createVideoPlayerFromSelector = (selector, config) => {
    const videoElement = document.querySelector(selector);
    if (!videoElement) {
        throw new Error(`Video element not found: ${selector}`);
    }
    return new GLECVideoPlayer({
        element: videoElement,
        ...config
    });
};
