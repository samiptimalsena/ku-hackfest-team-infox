from flask import Flask, jsonify, request
from utils import train_glow
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "/home/maspi/code/KU_HACKFEST/INFOX_TTS_TRAIN/vakyansh-tts/data/wavs/"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def main():
    return jsonify({"message": "Welcome to INFOX-Training"})

@app.route("/upload", methods=['POST'])
def upload():
    files = request.files
    for i in range(5):
        wav_file = files.get(str(i))
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], f'train_demo_{str(i)}.wav')
        wav_file.save(file_path)
    return jsonify({"message":"api working fine"})

@app.route("/train",methods=['POST'])
def train():
    result = train_glow()
    if result == "completed":
        return jsonify({"message": "Data resampled and prepared for training. Cannot start training process due to resouces limitation"})

@app.route("/healthz")
def healthz():
    return "API is up and running"

if __name__ == "__main__":
    app.run(port=5001)