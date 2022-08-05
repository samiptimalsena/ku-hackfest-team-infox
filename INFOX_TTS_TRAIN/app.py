from flask import Flask, jsonify
from utils import train_glow

app = Flask(__name__)

@app.route("/")
def main():
    return jsonify({"message": "Welcome to INFOX-Training"})

@app.route("/upload")
def upload():
    pass

@app.route("/train")
def train():
    result = train_glow()
    if result == "completed":
        return jsonify({"message": "Data resampled and prepared for training. Cannot start training process due to resouces limitation"})

@app.route("/healthz")
def healthz():
    return "API is up and running"

if __name__ == "__main__":
    app.run()
