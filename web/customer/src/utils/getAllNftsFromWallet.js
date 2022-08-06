import { Connection } from "@metaplex/js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import Axios from "axios";

// get all nfts of address
export const getAllNftsFromWallet = async (ownerPublickey) => {
  const connection = new Connection("devnet");
  // const ownerPublickey = "CpWeaCunbar89hJFZakAXCvjh2AJYsjz2mf2c3REkx1t";
  const nftsmetadata = await Metadata.findDataByOwner(
    connection,
    ownerPublickey
  );

  const dataReqs = nftsmetadata.map((d) => {
    const { uri } = d.data;
    return Axios.get(uri).then(({ data }) => {
      const { name, image } = data;
      return { name, image, mint_address: d.mint };
    });
  });

  const res = await Promise.all(dataReqs).then((e) => e);
  return res;
};
