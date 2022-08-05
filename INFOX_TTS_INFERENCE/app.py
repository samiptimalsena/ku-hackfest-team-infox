from flask import Flask, jsonify, request
from infox_utils.inference_model import run_tts
from infox_utils.load_model import load_glow_hifi

app = Flask(__name__)

@app.route("/")
def main():
    return jsonify({"message": "Welcome to INFOX"})

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

    return jsonify({"path": saved_wav_path})

@app.route("/healthz")
def healthz():
    return "api is up and working fine"

if __name__ == "__main__":
    app.run()