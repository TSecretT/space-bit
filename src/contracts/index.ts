import Lemon from './lemon';
import LemonToken from './lemonToken';

import config from '../config';
import { SpaceBit } from './spacebit';
import Token from './token';
import NFT from './nft';
import { myWallet } from '../utils';

const contract: any = new SpaceBit(config.CONTRACT_ADDRESS);
const token: any = new Token(config.CONTRACT_ADDRESS_TOKEN);
const nft: any = new NFT(config.CONTRACT_ADDRESS_NFT);

const isApproved = async (wallet: string|undefined): Promise<boolean> => {
    // const allowed: any = await token.allowance(wallet || localStorage.spacebit_wallet, config.CONTRACT_ADDRESS);
    // if(allowed){
    //     return true;
    // } else {
    //     return await new Promise((resolve, reject) => token.approveMax(localStorage.spacebit_wallet, config.CONTRACT_ADDRESS, (err: any, txHash: string) => {
    //         if(err) reject(false);
    //         resolve(true)
    //     }))
    // }
    return true
}

const connectWallet = async () => {
    const currentWindow: any = window;
    const accounts = await currentWindow.ethereum.request({ method: 'eth_requestAccounts' });
    localStorage.setItem('spacebit_wallet', accounts[0]);
    return accounts[0];
}

const checkWalletAccounts = async () => {
    const currentWindow: any = window;
    const accounts = await currentWindow.ethereum.request({ method: 'eth_accounts' });
    return accounts[0]
}

const approve = async () => {
    return await new Promise((resolve, reject) => {
        contract.approve(myWallet(), token.address, (err: any, txHash: string) => {
            if(err) reject(err)
            resolve(txHash)
        })
    })
}

export {
    contract,
    token,
    nft,
    isApproved,
    connectWallet,
    checkWalletAccounts,
    approve
}