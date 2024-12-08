from flask import Flask, jsonify
from flask_cors import CORS
import platform
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def set_windows_volume(volume_level):
    try:
        from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
        from comtypes import CLSCTX_ALL
        devices = AudioUtilities.GetSpeakers()
        interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
        volume = interface.QueryInterface(IAudioEndpointVolume)
        volume.SetMasterVolumeLevelScalar(volume_level, None)
        return True
    except Exception as e:
        print(f"Error setting Windows volume: {e}")
        return False

def set_linux_volume(volume_level):
    try:
        volume_percent = int(volume_level * 100)
        subprocess.run(['amixer', '-D', 'pulse', 'sset', 'Master', f'{volume_percent}%'])
        return True
    except Exception as e:
        print(f"Error setting Linux volume: {e}")
        return False

def set_mac_volume(volume_level):
    try:
        volume_percent = int(volume_level * 100)
        subprocess.run(['osascript', '-e', f'set volume output volume {volume_percent}'])
        return True
    except Exception as e:
        print(f"Error setting Mac volume: {e}")
        return False

@app.route('/volume/<float:level>', methods=['POST'])
def set_volume(level):
    if level < 0 or level > 1:
        return jsonify({'success': False, 'error': 'Volume must be between 0 and 1'})

    os_name = platform.system().lower()
    success = False

    if os_name == 'windows':
        success = set_windows_volume(level)
    elif os_name == 'linux':
        success = set_linux_volume(level)
    elif os_name == 'darwin':  # macOS
        success = set_mac_volume(level)

    return jsonify({'success': success})

@app.route('/mute', methods=['POST'])
def mute():
    try:
        if platform.system().lower() == 'windows':
            from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
            from comtypes import CLSCTX_ALL
            devices = AudioUtilities.GetSpeakers()
            interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
            volume = interface.QueryInterface(IAudioEndpointVolume)
            volume.SetMute(1, None)
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

@app.route('/unmute', methods=['POST'])
def unmute():
    try:
        if platform.system().lower() == 'windows':
            from pycaw.pycaw import AudioUtilities, IAudioEndpointVolume
            from comtypes import CLSCTX_ALL
            devices = AudioUtilities.GetSpeakers()
            interface = devices.Activate(IAudioEndpointVolume._iid_, CLSCTX_ALL, None)
            volume = interface.QueryInterface(IAudioEndpointVolume)
            volume.SetMute(0, None)
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)})

if __name__ == '__main__':
    app.run(port=5000) 