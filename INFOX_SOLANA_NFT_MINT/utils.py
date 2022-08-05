import json
import os
import subprocess
import glob

def create_nfts(user_address,price):
	try:
		# clear cache
		subprocess.run('rm -rf .cache'.split(' '))

		# inputs
		NUM_ITEMS = len(glob.glob("assets/*.json"))

		# update config
		data = None
		with open('configs/metaplex_config.json', 'r') as f:
			data = json.load(f) 
			data["solTreasuryAccount"] = user_address
			data["price"] = price
			data["number"] = NUM_ITEMS
		with open('configs/metaplex_config.json', 'w') as f:
			json.dump(data, f)

		# upload metadata
		os.system('./scripts/upload.sh')

		# get machine id
		with open('.cache/devnet-example.json', 'r') as f:
			data = json.load(f) 
			candey_machine_id = data.get("program").get("candyMachine")
			print("create:",candey_machine_id)
			return candey_machine_id
	except:
		return None

if __name__ == "__main__":
	print(
		create_nfts(
			"AkJV72T4Th2EccQkMafobDz6fekZbzMV7NQ3mGghMzs5", 1
		)
	)