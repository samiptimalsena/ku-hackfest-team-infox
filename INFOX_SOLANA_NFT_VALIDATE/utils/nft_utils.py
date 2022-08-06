from theblockchainapi import SolanaAPIResource, SolanaNetwork
import json

# Get an API key pair for free here: https://dashboard.blockchainapi.com/api-keys
MY_API_KEY_ID = "U5jsd8SS48sQNPn"
MY_API_SECRET_KEY = "LXCSsakZWsHWWZ0"

BLOCKCHAIN_API_RESOURCE = SolanaAPIResource(
    api_key_id=MY_API_KEY_ID,
    api_secret_key=MY_API_SECRET_KEY
)

NETWORK = SolanaNetwork.DEVNET

try:
    assert MY_API_KEY_ID is not None
    assert MY_API_SECRET_KEY is not None
except AssertionError:
    raise Exception("Fill in your key ID pair!")


def get_nft_owner(nft_mint_address):
    nft_owner = BLOCKCHAIN_API_RESOURCE.get_nft_owner(
        mint_address=nft_mint_address,
        network=NETWORK
    )

    return nft_owner

def get_nft_candy_machine_id(nft_mint_address):
    result = BLOCKCHAIN_API_RESOURCE.get_candy_machine_id_from_nft(
        mint_address=nft_mint_address,
        network=NETWORK
    ).get("candy_machine_id")
    return result


if __name__ == '__main__':
    nft_mint_address = 'GmzgPnVcxzGztmB6RtxSU7o7nCA5F4SE1aFuLBQ4Htg'
    # owner = get_nft_owner(nft_mint_address)
    # print(owner)

    candyMachineId = get_nft_candy_machine_id("GmzgPnVcxzGztmB6RtxSU7o7nCA5F4SE1aFuLBQ4Htg")
    print(candyMachineId)
    
    # candyMachineId = get_nft_candy_machine_id("G2Vbermr17oxZif2zJQDJUcyq6bwQSJSc1okLTnPUtUp")
    # print(candyMachineId)