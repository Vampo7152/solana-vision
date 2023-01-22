import { DefaultHead } from '@/layouts/DefaultHead';
import type { NextPage } from 'next';
import styles from '@/styles/Home.module.scss';
import { ConnectWallet } from '@/layouts/Wallet';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const { push } = useRouter();

  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    if (clicked && publicKey) push('/dashboard')
  }, [clicked, publicKey])

  return (
    <div className={styles.main}>
      <DefaultHead />
      <img className={styles.logo} src="https://res.cloudinary.com/dtzqgftjk/image/upload/v1674324595/2_cdaoyi_2_caoflv.png" alt="Solana Vision" />
      <h1 className={styles.headingOne}>Create minting links for CandyMachine & Gasless NFTs, seamlessly</h1>
      <h1 className={styles.headingTwo}>powered by <a target="_blank" rel="noreferrer" href="https://candypay.fun">CandyPay.</a></h1>
      <ConnectWallet>
        <button
          onClick={() => setClicked(true)}
          className="connect-wallet mt-1"
        >
          Get Started
        </button>
      </ConnectWallet>
    </div>
  );
}

export default Home
