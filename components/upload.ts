import toast from 'react-hot-toast';
import { WalletContextState } from '@solana/wallet-adapter-react';
import {client} from '../lib/web3Storage';
import axios from 'axios';

interface Metadata {
  name: string;
  description: string;
  image: string;
  network?: string;
}

const getMetadata = (
  metadata: Metadata,
  wallet: WalletContextState
) => {
  return {
    name: metadata.name,
    description: metadata.description,
    image: metadata.image,
    symbol: "SVNFT",
    seller_fee_basis_points: 0,
    attributes: [],
    category: "image",
    properties: {
      files: [],
      creators: [
        {
          address: wallet.publicKey?.toBase58(),
          verified: true,
          share: 100
        }
      ]
    }
  }
}

export const uploadImgbb = async (blob: any) => {
  if (blob) toast.loading('Uploading Image');
 
  const data = new FormData();
  data.append("image", blob);
  const imgBB = await axios.post('https://api.imgbb.com/1/upload?key=822079d074dfd089764b99744dadefc4', data);
  const img_url = imgBB.data.data.url

  if (img_url === null) {
    toast.dismiss();
    toast.error('Error uploading image/metadata');
    return;
  }
  toast.dismiss();
  toast.success('Image stored');
  return img_url;
};

export const uploadMetadata = async (
  wallet: WalletContextState,
  metadata: Metadata,
) => {

  if (metadata) toast.loading('Uploading metadata on IPFS');

  const metadataObject = metadata ? getMetadata(metadata, wallet) : null;
  const metadataFile = new File([JSON.stringify(metadataObject)], "metadata.json", {
    type: "application/json",
  });
  const metadata_cid = await client.put([metadataFile]);
  const metadata_url = `https://cloudflare-ipfs.com/ipfs/${metadata_cid}/metadata.json`;

  if (metadata_cid === null) {
    toast.dismiss();
    toast.error('Error uploading image/metadata');
    return;
  }
  toast.dismiss();
  toast.success('Metadata stored');
  return metadata_url;
};