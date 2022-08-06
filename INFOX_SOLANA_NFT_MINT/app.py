from flask import Flask,jsonify,request
import utils
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def main():
    return jsonify({"message": "Welcome to INFOX-SOLANA-MODEL-NFT-METAPLEX CANDY MINT"})

"""
Request sample
{
    "address":"AkJV72T4Th2EccQkMafobDz6fekZbzMV7NQ3mGghMzs5",
    "price":1
}
"""
@app.route("/api/create_collection", methods=['POST'])
def create_nfts():
    price = request.json.get("price")
    creator_address = request.json.get("address")

    if not(price and creator_address):
        return jsonify({"message": "bad_input"})

    new_candy_machine_id = utils.create_nfts(creator_address,price)

    return jsonify({"candy_machine_id": new_candy_machine_id})


if __name__ == "__main__":
    app.config['DEBUG'] = True
    app.run()