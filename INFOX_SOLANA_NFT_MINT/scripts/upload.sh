CLI="ts-node metaplex-cli/src/candy-machine-v2-cli.ts"
FEE_PAYER="./configs/fee_payer.json"
CONFIG="./configs/metaplex_config.json"
ASSETS="./assets"

echo "Uploading metadata ⛹\n"
$CLI upload -e devnet -k $FEE_PAYER -cp $CONFIG -c example $ASSETS

echo "\nVeriying metadata 🔎\n"
$CLI verify_upload -e devnet -k $FEE_PAYER -c example

clear
echo "Successfullu launced the nft"  