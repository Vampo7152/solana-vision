import toast from 'react-hot-toast';
import styles from '@/styles/apps/Index.module.scss';
import uploadImage from '@/images/elements/upload-image.svg';
import { SystemProgram, PublicKey, LAMPORTS_PER_SOL, Transaction } from "@solana/web3.js";
import {
  useState,
  useRef,
} from 'react';
import { NextPage } from 'next';
import { Navbar } from '@/layouts/Navbar';
import { DefaultHead } from '@/layouts/DefaultHead';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { uploadImgbb, uploadMetadata } from '@/components/upload';
import { getTrimmedPublicKey } from '@/lib/utils';
import {
  Tooltip,
} from "@chakra-ui/react";
import axios from 'axios';
import { API_KEY } from '../lib/config/constants';


const Gasless: NextPage = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();
  const fileInputRef = useRef(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [number, setNumber] = useState('');
  const [solanaUrl, setSolanaUrl] = useState('');
  const [payer, setPayer] = useState('');
  const [amount, setAmount] = useState(0);
  const [hasPaid, setHasPaid] = useState(false);


  const handleMint = async () => {
    if (!wallet) {
      toast.error('Please go back to home and connect your solana wallet');
      return;
    };

    if (!name || !description || !image || !number) {
      toast.error('Please fill out all fields');
      return;
    };

    const metadataURI = await uploadMetadata(wallet, {
      name,
      description,
      image,
    })!;
    toast.loading('Creating Gasless collection');
    let headersList = {
      "Accept": "*/*",
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    }
    let size = Number(number)
    let bodyContent = JSON.stringify({
      "name": name,
      "symbol": "",
      "uri": metadataURI!,
      "seller_fee": 0,
      "collection_size": size,
      "network": "mainnet",
    }
    );

    let reqOptions = {
      url: "https://api.candypay.fun/api/v1/gasless/generate",
      method: "POST",
      headers: headersList,
      data: bodyContent,
    }
    const response = await axios.request(reqOptions);
    const solana_url = response.data.metadata.solana_url;
    const public_key = response.data.metadata.public_key;
    const amount = response.data.metadata.amount;
    toast.dismiss();
    toast.success('Successfully created Gasless collection');
    console.log("Payer wallet:", public_key);
    console.log("Solana url:", solana_url);
    console.log("Amount to be paid:", amount);
    setSolanaUrl(solana_url)
    setPayer(public_key)
    setAmount(amount)
  }

  const handlePayment = async () => {
    if (!wallet) {
      toast.error('Please go back to home and connect your solana wallet');
      return;
    };

    if (!name || !description || !image || !number) {
      toast.error('Please fill out all fields');
      return;
    };
    toast.loading('paying gas fees to create mint url');

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey!,
        toPubkey: new PublicKey(payer),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const signature = await sendTransaction(transaction, connection);

    await connection.confirmTransaction(signature, "confirmed");
    toast.dismiss();
    toast.success("Successfully created minting url for Gasless collection");
    setHasPaid(true)
  }

  return (
    <div>
      <DefaultHead title="Gasless NFT collection" />
      <Navbar pageName="Gasless NFT collection" />
      <div className={styles.container}>
        <div className={styles.gaslessbox}>

          <div>
            <h1 className={styles.heading}>Gasless NFT collection</h1>
            <p className={styles.description}>Create minting url for a Gasless NFT collection, where you
              pay for gas fees beforehand and others can mint in a gasless manner. Works on mainnet by default*</p>
            <div className="mt-2">
              <p className={styles.inputLabel}>Enter name of the NFT</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                placeholder="Eg. My first NFT"
              />
            </div>
            <div className="mt-1-5">
              <p className={styles.inputLabel}>Enter a description about the NFT</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Eg. This image is of the first computer that I got from my father at age of 10"
              />
            </div>
            <div className="mt-1">
              <p className={styles.inputLabel}>Total number of NFTs available to mint</p>
              <input
                value={number}
                type="number"
                onChange={(e) => setNumber(e.target.value)}
                className={styles.input}
                placeholder="Eg. 20"
              />
            </div>
            <div
              className="mt-1-5 pointer"
              // @ts-expect-error
              onClick={() => fileInputRef?.current?.click()}
            >
              <p className={styles.inputLabel}>Select the NFT image</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = await uploadImgbb(file);
                  if (url) setImage(url);
                }}
              />
              <img
                src={image ? image : uploadImage.src}
                className={styles.inputImage}
                alt="Upload Image"
              />
            </div>

          </div>

          <button
            onClick={handleMint}
            className="default-btn"
          >
            Submit
          </button>
        </div>
        {solanaUrl ? (
          <>
            <div className={styles.linkbox}>
              <div>
                {!hasPaid ?
                  <p>💸 Please pay {amount} SOL on mainnet to create minting URL for your Gasless collection: <button onClick={handlePayment} className={styles.paymentButton}>Pay Now</button></p>
                  :
                  <div className={styles.linkbox}>
                    <div>
                      🎉 Successfully created minting url: {" "} <a className={styles.solanaUrl} onClick={() => {
                        navigator.clipboard.writeText(solanaUrl);
                        toast.success("Copied to clipboard");
                      }}><Tooltip label="Click to Copy">{getTrimmedPublicKey(solanaUrl)}</Tooltip></a>
                    </div>
                    <div className={styles.description}>
                      - Click & copy the minting url above and visit tools like <span className={styles.solanaUrl}><a target={'_blank'} rel="noreferrer" href="https://www.qrcode-monkey.com/">QR Code Monkey</a></span> to create a QR code for minting NFTs
                    </div>
                  </div>}
              </div>
            </div>
          </>) : null}
      </div>
    </div>
  );
}

export default Gasless;