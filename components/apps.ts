import mintNFT from '@/images/apps/mint-nft.png';
import uploadImage from '@/images/apps/upload.png';
import solanaImage from '@/images/apps/solana.png';

interface AppInterface {
  name: string;
  description: string;
  image: string;
  link: string;
  button: string;
  gradient: string;
}

const apps = [
  {
    name: "CandyMachine mint URL",
    description: "Create minting url for CandyMachine collections",
    button: "Create",
    link: "/gasless",
    gradient: "linear-gradient(109.2deg, #C762F7 -3.96%, #F76262 100.3%)",
    image: mintNFT.src
  },
  {
    name: "Gasless NFT collection",
    description: "Create minting url for a Gasless NFT collection",
    button: "Create",
    link: "/candymachine",
    gradient: "linear-gradient(109.2deg, #62F7EE -3.96%, #6271F7 100.3%)",
    image: uploadImage.src
  }
]

export { apps }
export type { AppInterface };