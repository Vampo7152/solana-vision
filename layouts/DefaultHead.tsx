import { DEFAULT_OG_IMAGE } from '@/lib/config/constants';
import Head from 'next/head';

interface SEO {
  title?: string;
  description?: string;
  image?: string;
  creator?: string;
  app_name?: string;
  url?: string;
}

export const DefaultHead = (config: SEO) => {
  return (
    <Head>
      <title>{config.title || 'CandyPay'}</title>
      <meta name='description' content={config.description || 'Create minting links for CandyMachine & Gasless NFTs, seamlessly'} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name="theme-color" content="white" />
      <link rel='icon' href='https://res.cloudinary.com/dtzqgftjk/image/upload/v1669972940/2_cdaoyi_1_somgup.png' />

      {config.creator && (
        <meta name='author' content={config.creator} />
      )}

      {config.app_name && (
        <meta name='og:site_name' content={config.app_name} />
      )}

      <meta property='og:type' content={'website'} />
      <meta property='og:url' content={config.url || 'https://solanavision.app'} />
      <meta property='og:title' content={config.title || 'CandyPay'} />
      <meta property='og:description' content={config.description || 'Create minting links for CandyMachine & Gasless NFTs, seamlessly'} />
      <meta property='og:image' content={config.image || DEFAULT_OG_IMAGE} />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={config.url || 'https://solanavision.app'} />
      <meta property='twitter:title' content={config.title || 'CandyPay'} />
      <meta property='twitter:description' content={config.description || 'Create minting links for CandyMachine & Gasless NFTs, seamlessly'} />
      <meta property='twitter:image' content={config.image || DEFAULT_OG_IMAGE} />
    </Head>
  );
};
