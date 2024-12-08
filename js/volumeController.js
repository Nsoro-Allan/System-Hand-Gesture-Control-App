class VolumeController {
    constructor() {
        this.audioContext = null;
        this.gainNode = null;
        this.currentVolume = 1.0;
        this.isMuted = false;
        this.systemVolume = new SystemVolumeController();
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
        const VOLUME_STEP = 0.1;
        
        switch (gesture) {
            case 'VOLUME_UP':
                this.currentVolume = Math.min(this.currentVolume + VOLUME_STEP, 1.0);
                this.isMuted = false;
                this.systemVolume.setVolume(this.currentVolume);
                break;
            case 'VOLUME_DOWN':
                this.currentVolume = Math.max(this.currentVolume - VOLUME_STEP, 0.0);
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