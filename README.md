# Gesture Volume Control

A web-based application that allows you to control your system's volume using hand gestures, powered by TensorFlow.js and MediaPipe Hands.

## Features

- Real-time hand gesture detection
- Volume control through hand movements
- Dark/light mode toggle
- Adjustable sensitivity
- Visual feedback with hand tracking overlay

## Gestures

- Raise hand up: Increase volume
- Lower hand: Decrease volume
- Flat hand: Toggle mute

## Setup

1. Clone this repository
2. Open index.html in a modern web browser
3. Grant camera permissions when prompted
4. Start controlling your volume with hand gestures!

## Requirements

- Modern web browser with WebGL support
- Webcam
- JavaScript enabled

## Technical Details

This application uses:
- TensorFlow.js for machine learning
- MediaPipe Hands for hand tracking
- Tailwind CSS for styling
- Web Audio API for volume control

## Notes

- The volume control affects the browser's audio output only
- Performance may vary depending on your hardware
- Works best in well-lit conditions 