from flask import Flask,jsonify,request
from utils.user_request_validate import user_nft_request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route("/")
def main():
    return jsonify({"message": "Welcome to INFOX-SOLANA-MODEL-NFT-VALIDATION"})

"""
Sample Request
{
  "address":"HW2WmAcsTvy8Uco1AcZ2MVLrKA8wup7w3k8qRBB7cX1e",
  "sig":"c255253f9fbc5d3d192a2f13d74471adbd03442adc1cb8bab62e95590551c7761d70c6eac45d2b7eeb3b616dedf0c6615b5b8305c36aa5efee54d951b7f7100",
  "data":"TTS API ACCESS",
  "nft_mint_address":"HxFqA1EbnPnC5NHXZoZ2YNEQumDzr567ftnVhFWZBNYK"

  [ture, model]
}
"""
@app.route("/api/solana/validate_nft_access", methods=['POST'])
def inference():
    address = request.json.get("address")
    sig = request.json.get("sig")
    data = request.json.get("data")
    nft_mint_address = request.json.get("nft_mint_address")

    if not (address and sig and data and nft_mint_address):
        return jsonify({"message": "Invalid datas"})

    [wasRequestValid, modelName] = user_nft_request(
        address, sig, data, nft_mint_address
    )

    return jsonify({
        "allow": wasRequestValid, 
        "model":modelName
    })

if __name__ == "__main__":
    app.config['DEBUG'] = True
    app.run()