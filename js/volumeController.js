class VolumeController {
    constructor() {
        this.audioContext = null;
        this.gainNode = null;
        this.currentVolume = 1.0;
        this.isMuted = false;
        this.systemVolume = new SystemVolumeController();
        this.lastGesture = null;
        this.lastGestureTime = 0;
    }

    async initialize() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.gainNode = this.audioContext.createGain();
            
            // Create a dummy oscillator to initialize audio context
            const oscillator = this.audioContext.createOscillator();
            oscillator.connect(this.gainNode);
            this.gainNode.connect(this.audioContext.destination);
            
            return true;
        } catch (error) {
            console.error('Error initializing volume controller:', error);
            return false;
        }
    }

    adjustVolume(gesture) {
        // Prevent rapid repeated gestures by requiring a small delay
        const now = Date.now();
        if (gesture === this.lastGesture && now - this.lastGestureTime < 1000) {
            return; // Ignore repeated gestures within 1 second
        }
        
        this.lastGesture = gesture;
        this.lastGestureTime = now;
        
        switch (gesture) {
            case 'VOLUME_UP':
                // Increase volume by 10%
                this.currentVolume = Math.min(this.currentVolume + 0.1, 1.0);
                this.isMuted = false;
                this.systemVolume.setVolume(this.currentVolume);
                break;
            case 'VOLUME_DOWN':
                // Decrease volume by 10%
                this.currentVolume = Math.max(this.currentVolume - 0.1, 0.0);
                this.isMuted = false;
                this.systemVolume.setVolume(this.currentVolume);
                break;
            case 'MUTE':
                this.isMuted = !this.isMuted;
                if (this.isMuted) {
                    this.systemVolume.mute();
                } else {
                    this.systemVolume.unmute();
                }
                break;
        }

        this.gainNode.gain.value = this.isMuted ? 0 : this.currentVolume;
    }

    getCurrentVolume() {
        return this.isMuted ? 0 : this.currentVolume;
    }
} 