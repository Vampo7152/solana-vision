import toast from 'react-hot-toast';
import styles from '@/styles/apps/Index.module.scss';
import uploadImage from '@/images/elements/upload-image.svg';
import {
  useState,
  useRef,
  useEffect
} from 'react';
import { NextPage } from 'next';
import { Navbar } from '@/layouts/Navbar';
import { DefaultHead } from '@/layouts/DefaultHead';
import { useWallet } from '@solana/wallet-adapter-react';
import { uploadImgbb, uploadMetadata } from '@/components/upload';
import { getGaslessUrl } from '@/components/getUrl';

const Gasless: NextPage = () => {
  const wallet = useWallet();
  const fileInputRef = useRef(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [network, setNetwork] = useState('mainnet');
  const [image, setImage] = useState('');
  const [number, setNumber] = useState('');


  const handleMint = async () => {

    if (!wallet) {
      toast.error('Please go back to home and connect your solana wallet');
      return;
    };

    if (!name || !description || !image || !network || !number) {
      toast.error('Please fill out all fields');
      return;
    };
    const metadataURI = await uploadMetadata(wallet, {
      name,
      description,
      image,
    });

    const url = getGaslessUrl(wallet, metadataURI!, {
      name,
      description,
      image,
      network,
      number
    })

    toast.promise(url, {
      loading: "Creating minting url",
      error: "Failed to create minting url",
      success: "Successfully created minting url"
    });
    const solana_url = await url;
    if (solana_url) {
      toast(() => (
        <span>
         Minting Link: 
          <button
            onClick={() => window.open(solana_url, '_blank')}
            className={styles.toastButton}
          >
            Open
          </button>
        </span>
      ));
    }
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
              pay for gas fees beforehand and others can mint in a gasless manner</p>
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
            <div className="mt-1-5">
              <p className={styles.inputLabel}>Select the network</p>
              <select
                value={network}
                className={`${styles.selectarea}`}
                onChange={(e) => {
                  setNetwork(e.target.value);
                }}
              >
                <option value="mainnet">Mainnet</option>
                <option value="devnet">Devnet</option>
              </select>
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
      </div>
    </div>
  );
}

export default Gasless;