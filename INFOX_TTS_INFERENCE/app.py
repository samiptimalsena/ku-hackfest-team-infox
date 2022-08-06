from flask import Flask, jsonify, request, send_file
# from infox_utils.inference_model import run_tts
# from infox_utils.load_model import load_glow_hifi
from flask_cors import CORS

import base64 


app = Flask(__name__)
CORS(app)

@app.route("/")
def main():
    return jsonify({"message": "Welcome to INFOX"})

@app.route("/check")
def check():
    saved_wav_path = "/home/maspi/code/KU_HACKFEST/INFOX_TTS_INFERENCE/output/sanup.wav"
    return send_file(
        saved_wav_path, 
        mimetype="audio/wav", 
        as_attachment=True, 
        # attachment_filename="test.wav"
        )

@app.route("/api/inference/<string:model_name>", methods=['POST'])
def inference(model_name):
    
    text = request.json.get("text")
    username = request.json.get("username")

    if not text:
        return jsonify({"message": "Please provide some text"})
    if not username:
        username = "temp"

    text_to_mel, mel_to_wav = load_glow_hifi(model_name)
    saved_wav_path = run_tts(text, text_to_mel, mel_to_wav, username)

    return send_file(
        saved_wav_path, 
        mimetype="audio/wav", 
        as_attachment=True, 
        # attachment_filename="test.wav"
        )

    # return send_file(saved_wav_path, mimetype="audio/wav", as_attachment=True, attachment_filename="output.wav")

    # return jsonify({"path": saved_wav_path})

@app.route("/healthz")
def healthz():
    return "api is up and working fine"

if __name__ == "__main__":
    app.run()