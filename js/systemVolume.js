class SystemVolumeController {
    constructor() {
        this.API_URL = 'http://localhost:5000';
    }

    async setVolume(level) {
        try {
            const response = await fetch(`${this.API_URL}/volume/${level}`, {
                method: 'POST'
            });
            const data = await response.json();
            if (!data.success) {
                console.error('Failed to set system volume:', data.error);
            }
        } catch (error) {
            console.error('Failed to communicate with volume control server:', error);
        }
    }

    async mute() {
        try {
            const response = await fetch(`${this.API_URL}/mute`, {
                method: 'POST'
            });
            const data = await response.json();
            if (!data.success) {
                console.error('Failed to mute system:', data.error);
            }
        } catch (error) {
            console.error('Failed to communicate with volume control server:', error);
        }
    }

    async unmute() {
        try {
            const response = await fetch(`${this.API_URL}/unmute`, {
                method: 'POST'
            });
            const data = await response.json();
            if (!data.success) {
                console.error('Failed to unmute system:', data.error);
            }
        } catch (error) {
            console.error('Failed to communicate with volume control server:', error);
        }
    }
} 