CLI="ts-node metaplex-cli/src/candy-machine-v2-cli.ts"
FEE_PAYER="./configs/fee_payer.json"
CONFIG="./configs/metaplex_config.json"
ASSETS="./assets"

$CLI mint_one_token \
    -e devnet \
    -k $FEE_PAYER \
    -c example