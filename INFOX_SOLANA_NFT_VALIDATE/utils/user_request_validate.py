from . import nft_utils
from . import signature_verify

address = "HW2WmAcsTvy8Uco1AcZ2MVLrKA8wup7w3k8qRBB7cX1e"
sig = "c255253f9fb5c5d3d192a2f13d74471adbd03442adc1cb8bab62e95590551c7761d70c6eac45d2b7eeb3b616dedf0c6615b5b8305c36aa5efee54d951b7f7100"
data = "TTS API ACCESS"
nft_mint_address = "HxFqA1EbnPnC5NHXZoZ2YNEQumDzr567ftnVhFWZBNYK"


savedCollections = {
    "14PuYQvAzjcQBZBkv4zLXt5o7LCF6aJtKsw5A5AMNb6c":"model_name_user",
    "FUpo6HRHWig2CRB9DWGrv876XjPAhNMts4zA5WuMu7kY":"model_name_user"
}

def user_nft_request(address, sig, data, nft_mint_address):
    # checks if nft belongs to the registered model collection
    candy_machine_id = nft_utils.get_nft_candy_machine_id(nft_mint_address)
    model_name = savedCollections.get(candy_machine_id,"model_name_user")

    # if not model_name:
    #     print("candy mint not found")
    #     return [False, None]
    
    # check_if_address_owns_nft(address,nft_mint_address)
    if address != nft_utils.get_nft_owner(nft_mint_address):
        print(f"Address {address} is not the owner of NFT {nft_mint_address}")
        return [False, None]

    # check_if_signature_was_valid
    if not signature_verify.verify_signature(address,sig,data): 
        print("Failed to verify the siganture")
        return [False, None]

    return [True, model_name]
    

if __name__ == '__main__':
    print(
        user_nft_request(
            address,
            sig,
            data,
            nft_mint_address
        )
    )


