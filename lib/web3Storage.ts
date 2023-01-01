import { Web3Storage } from "web3.storage";
import { STORAGE_TOKEN } from "./config/constants"

const client = new Web3Storage({
  token: STORAGE_TOKEN,
});

export { client };