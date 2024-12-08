class App {
    constructor() {
        this.gestureDetector = new GestureDetector();
        this.volumeController = new VolumeController();
        this.isDetectionEnabled = true;
        this.sensitivity = 5;
        
        this.setupEventListeners();
    }

    async initialize() {
        const status = document.getElementById('status');
        
        status.textContent = 'Initializing...';
        
        const gestureInitialized = await this.gestureDetector.initialize();
        const volumeInitialized = await this.volumeController.initialize();
        
        if (gestureInitialized && volumeInitialized) {
            status.textContent = 'Ready';
            this.startDetectionLoop();
            return true;
        } else {
            status.textContent = 'Initialization failed';
            return false;
        }
    }

    setupEventListeners() {
        // Detection toggle
        const enableDetection = document.getElementById('enableDetection');
        enableDetection.addEventListener('change', (e) => {
            this.isDetectionEnabled = e.target.checked;
        });

        // Sensitivity slider
        const sensitivity = document.getElementById('sensitivity');
        sensitivity.addEventListener('input', (e) => {
            this.sensitivity = parseInt(e.target.value);
        });
    }

    async startDetectionLoop() {
        const status = document.getElementById('status');
        
        const detect = async () => {
            if (this.isDetectionEnabled) {
                const gesture = await this.gestureDetector.detectGesture();
                
                if (gesture) {
                    this.volumeController.adjustVolume(gesture);
                    status.textContent = `Gesture: ${gesture} (Volume: ${Math.round(this.volumeController.getCurrentVolume() * 100)}%)`;
                }
            }
            
            requestAnimationFrame(detect);
        };

        detect();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.initialize();
}); 