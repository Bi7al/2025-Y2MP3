from flask import Flask, request, send_file
from flask_cors import CORS
import os
from pytubefix import YouTube
import subprocess

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def youtube_to_mp3(youtube_url, output_path="output"):
    try:
        # Create output directory if it doesn't exist
        os.makedirs(output_path, exist_ok=True)

        # Download YouTube video
        yt = YouTube(youtube_url)
        video = yt.streams.filter(only_audio=True).order_by('abr').last()
        download_path = video.download(output_path)

        # Convert to MP3 using ffmpeg
        base, ext = os.path.splitext(download_path)
        mp3_path = f"{base}.mp3"

        # Only convert if the file is not already in MP3 format
        if ext.lower() != ".mp3":
            subprocess.run(["ffmpeg", "-i", download_path, "-q:a", "0", "-map", "a", mp3_path])
            os.remove(download_path)  # Clean up the original file
        else:
            mp3_path = download_path

        return mp3_path
    except Exception as e:
        return str(e)

@app.route('/convert', methods=['POST'])
def convert_video():
    url = request.json['url']
    try:
        mp3_file = youtube_to_mp3(url)
        return send_file(mp3_file, as_attachment=True)
    except Exception as e:
        return {'error': str(e)}, 400

# Vercel requires a WSGI application
app = app
