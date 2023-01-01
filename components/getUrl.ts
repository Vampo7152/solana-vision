import { WalletContextState } from '@solana/wallet-adapter-react';
import axios from 'axios';
import { API_KEY } from '../lib/config/constants';

interface Metadata {
    name: string;
    description: string;
    image: string;
    network: string;
    number: string
}

export const getGaslessUrl = async (
    wallet: WalletContextState,
    uri: string,
    metadata: Metadata,
) => {
    if (wallet.publicKey === null) return;

    let headersList = {
        "Accept": "*/*",
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
    }
    let size = Number(metadata.number)
    let bodyContent = JSON.stringify({
        "name": metadata.name,
        "symbol": "",
        "uri": uri,
        "seller_fee": 0,
        "collection_size": size,
        "network": metadata.network,
    }
    );

    let reqOptions = {
        url: "https://api.candypay.fun/api/v1/gasless/generate",
        method: "POST",
        headers: headersList,
        data: bodyContent,
    }

    const response = await axios.request(reqOptions);
    console.log(response.data);
    console.log("amount asked", response.data.metadata.amount);
    const solana_url = response.data.metadata.solana_url;

    if (solana_url) return solana_url;
    throw new Error('Unable to create mint url');
};

export const getCandyUrl = async (
    candymachine: string,
    image: string,
    name: string,
    network: string
) => {
    if (candymachine === null) return;

    let headersList = {
        "Accept": "*/*",
        "Authorization": "Bearer tF_f71sRp3UV-hRfJlauo",
        "Content-Type": "application/json"
    }
    let bodyContent = JSON.stringify({
        "candy_machine_id": candymachine,
        "icon": image,
        "label": name,
        "network": network,
    }
    );

    let reqOptions = {
        url: "https://api.candypay.fun/api/v1/generate",
        method: "POST",
        headers: headersList,
        data: bodyContent,
    }

    const response = await axios.request(reqOptions);
    console.log(response.data);
    const solana_url = response.data.metadata.solana_url;

    if (solana_url) return solana_url;
    throw new Error('Unable to create mint url');
};