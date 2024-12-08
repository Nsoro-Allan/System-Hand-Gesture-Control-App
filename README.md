# Gesture Volume Control

A web-based application that allows you to control your system's volume using hand gestures, powered by TensorFlow.js and MediaPipe Hands.

## Features

- Real-time hand gesture detection
- Volume control through hand movements
- Dark mode interface
- Adjustable sensitivity
- Visual feedback with hand tracking overlay
- 10% volume increments for precise control
- 1-second gesture cooldown to prevent rapid changes

## Gestures

- Show 2 fingers: Increase volume by 10%
- Show 3 fingers: Decrease volume by 10%
- Show 4 fingers: Toggle mute/unmute

## Setup

1. Clone this repository
2. Install the required Python packages:
    ```bash
    pip install flask flask-cors pycaw comtypes
    ```

3. Start the Python backend server:
    ```bash
    python server.py
    ```

4. Open index.html in a modern web browser
5. Grant camera permissions when prompted
6. Start controlling your volume with hand gestures!

## Requirements

- Modern web browser with WebGL support
- Webcam
- JavaScript enabled
- Python 3.6 or higher
- For Windows: pycaw library
- For Linux: amixer command
- For macOS: osascript command

## Technical Details

This application uses:
- TensorFlow.js for machine learning
- MediaPipe Hands for hand tracking
- Tailwind CSS for styling
- Flask backend for system volume control
- pycaw/amixer/osascript for OS-specific volume management

## Notes

- The volume control affects the system's master volume
- Performance may vary depending on your hardware
- Works best in well-lit conditions
- Volume changes occur in 10% increments
- There is a 1-second cooldown between volume adjustments
- The interface uses a dark theme for better visibility

## Gesture Detection Details

- Volume Up: Detected when exactly 2 fingers are extended
- Volume Down: Detected when exactly 3 fingers are extended
- Mute/Unmute: Detected when exactly 4 fingers are extended

## Troubleshooting

1. If volume control isn't working:
    - Ensure the Python server is running
    - Check if you have the required permissions
    - Verify your OS-specific volume control dependencies

2. If gestures aren't being detected:
    - Ensure good lighting conditions
    - Keep your hand within camera view
    - Try adjusting the sensitivity slider

3. If the server won't start:
    - Verify all Python dependencies are installed
    - Check if another process is using port 5000
    - Ensure you have the required system permissions