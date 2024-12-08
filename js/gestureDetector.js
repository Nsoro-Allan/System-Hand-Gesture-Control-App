class GestureDetector {
    constructor() {
        this.hands = null;
        this.videoElement = document.getElementById('video');
        this.canvasElement = document.getElementById('output');
        this.canvasCtx = this.canvasElement.getContext('2d');
        this.lastGesture = null;
        this.isInitialized = false;
    }

    async initialize() {
        try {
            this.hands = await handpose.load();
            this.isInitialized = true;
            
            // Setup webcam
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { width: 640, height: 480 }
            });
            this.videoElement.srcObject = stream;
            
            // Wait for video to be loaded
            await new Promise(resolve => {
                this.videoElement.onloadedmetadata = () => {
                    this.videoElement.play();
                    resolve();
                };
            });

            // Set canvas size
            this.canvasElement.width = this.videoElement.videoWidth;
            this.canvasElement.height = this.videoElement.videoHeight;

            return true;
        } catch (error) {
            console.error('Error initializing gesture detector:', error);
            return false;
        }
    }

    async detectGesture() {
        if (!this.isInitialized) return null;

        const predictions = await this.hands.estimateHands(this.videoElement);
        
        if (predictions.length > 0) {
            const hand = predictions[0];
            
            // Calculate hand position and movement
            const palmBase = hand.landmarks[0];
            const gesture = this.interpretGesture(hand.landmarks);
            
            // Draw hand landmarks
            this.drawHand(hand.landmarks);
            
            return gesture;
        }

        return null;
    }

    interpretGesture(landmarks) {
        const palmBase = landmarks[0];
        const fingerTips = landmarks.slice(8, 21, 4); // Get finger tips positions
        const fingerBases = landmarks.slice(5, 18, 4); // Get finger base positions
        
        // Calculate average height of finger tips relative to palm
        const avgHeight = fingerTips.reduce((sum, tip) => sum + (palmBase[1] - tip[1]), 0) / fingerTips.length;
        
        // Check for straight hand gesture (finger tips far from palm)
        const isStraightHand = fingerTips.every((tip, i) => {
            const base = fingerBases[i];
            const distance = Math.sqrt(
                Math.pow(tip[0] - base[0], 2) + 
                Math.pow(tip[1] - base[1], 2)
            );
            return distance > 60; // Threshold for considering fingers straight
        });
        
        if (isStraightHand) {
            return 'MUTE';
        }
        
        if (avgHeight > 30) {
            return 'VOLUME_UP';
        } else if (avgHeight < -30) {
            return 'VOLUME_DOWN';
        }
        
        return null;
    }

    drawHand(landmarks) {
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        
        // Draw landmarks
        landmarks.forEach(point => {
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(point[0], point[1], 5, 0, 2 * Math.PI);
            this.canvasCtx.fillStyle = '#00FF00';
            this.canvasCtx.fill();
        });
        
        // Draw connections
        this.canvasCtx.beginPath();
        this.canvasCtx.moveTo(landmarks[0][0], landmarks[0][1]);
        landmarks.forEach(point => {
            this.canvasCtx.lineTo(point[0], point[1]);
        });
        this.canvasCtx.strokeStyle = '#00FF00';
        this.canvasCtx.stroke();
    }
} 