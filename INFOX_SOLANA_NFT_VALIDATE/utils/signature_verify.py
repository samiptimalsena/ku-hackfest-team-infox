from solana.publickey import PublicKey
from nacl.signing import VerifyKey
from solana.publickey import PublicKey

def verify_signature(address,sig,data):
    signature_bytes = bytes(bytearray.fromhex(sig))
    
    pubkey = bytes(PublicKey(address))
    msg = bytes(data, 'utf8')

    try:
        VerifyKey(pubkey).verify(
            smessage=msg,  
            signature=signature_bytes
        )
        return True

    except:
        return False    

if __name__ == '__main__':
    address = "CpWeaCunbar89hJFZakAXCvjh2AJYsjz2mf2c3REkx1t"
    sig = "cb9da71d9e8217a18b42a6281d0bef359d53c1d729a4e8859fd85a1900b4b4066772a96244738f7e66049f5d70a88938b36edf8ae793e37f08e8ba7166ebc80c"
    data = "TTS API ACCESS"

    verify_signature(
        address,
        sig,
        data
    )