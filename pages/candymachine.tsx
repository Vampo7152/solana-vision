import toast from 'react-hot-toast';
import styles from '@/styles/apps/Index.module.scss';
import uploadImage from '@/images/elements/upload-image.svg';
import {
    useState,
    useRef,
} from 'react';
import { NextPage } from 'next';
import { Navbar } from '@/layouts/Navbar';
import { DefaultHead } from '@/layouts/DefaultHead';
import { uploadImgbb } from '@/components/upload';
import { getCandyUrl } from '@/components/getUrl';

const CandyMachine: NextPage = () => {
    const fileInputRef = useRef(null);
    const [name, setName] = useState('');
    const [candymachine, setCandymachine] = useState('');
    const [network, setNetwork] = useState('mainnet');
    const [image, setImage] = useState('');

    const handleMint = async () => {
        if ( !name || !candymachine || !image || !network) {
            toast.error('Please fill out all fields');
            return;
        };

        console.log("network we using", network);
        const url = getCandyUrl(
            candymachine,
            image,
            name,
            network
        );

        toast.promise(url, {
            loading: "Creating minting url",
            error: "Failed to create minting url",
            success: "Successfully created minting url"
        });
        const solana_url = await url;
        console.log(solana_url);
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
            <DefaultHead title="CandyMachine Mint URL" />
            <Navbar pageName="CandyMachine Mint URL" />
            <div className={styles.container}>
                <div className={styles.candymachinebox}>

                    <div>
                        <h1 className={styles.heading}>CandyMachine Mint URL</h1>
                        <p className={styles.description}>A simple tool to create minting url for CandyMachine collections</p>
                        <div className="mt-2">
                            <p className={styles.inputLabel}>Enter name of the NFT collection</p>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={styles.input}
                                placeholder="Eg. Monkey Business"
                            />
                        </div>
                        <div className="mt-1">
                            <p className={styles.inputLabel}>Enter the CandyMachine ID</p>
                            <input
                                value={candymachine}
                                onChange={(e) => setCandymachine(e.target.value)}
                                className={styles.input}
                                placeholder="Eg. GrVSy3ZRbuw5ACbwSEMsj9gULk9MW7QPK1TUYcP6nLM"
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

export default CandyMachine;