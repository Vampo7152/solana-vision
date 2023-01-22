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
    link: "/candymachine",
    gradient: "#fff",
    image: "https://shdw-drive.genesysgo.net/BfBZRXtX2ad9dVyJnc6Tbww8egupegtiV2xiwWCBYH1h/image-removebg-preview%20(5).png"
  },
  {
    name: "Gasless NFT collection",
    description: "Create minting url for a Gasless NFT collection",
    button: "Create",
    link: "/gasless",
    gradient: "#fff",
    image: "https://shdw-drive.genesysgo.net/BfBZRXtX2ad9dVyJnc6Tbww8egupegtiV2xiwWCBYH1h/image-removebg-preview%20(4).png"
  }
]

export { apps }
export type { AppInterface };