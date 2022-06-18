import Lemon from './lemon';
import LemonToken from './lemonToken';

import config from '../config';

const contract: any = new Lemon(config.CONTRACT_ADDRESS_W_L);
const token: any = new LemonToken(config.TOKEN_CONTRACT);

const isApproved = async (wallet: string) => {
    const allowed: any = await token.allowance(localStorage.wallet, config.CONTRACT_ADDRESS);
    if(allowed){
        return true;
    } else {
        return await new Promise((resolve, reject) => token.approveMax(localStorage.wallet, config.CONTRACT_ADDRESS, (err: any, txHash: string) => {
            if(err) reject(false);
            resolve(true)
        }))
    }

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
    return await new Promise((resolve, reject) => token.approveMax(localStorage.wallet, config.CONTRACT_ADDRESS_W_L, (err: any, txHash: string) => {
        if(err) {console.error(err); return reject() }
        resolve(txHash);
    }));
}

export {
    contract,
    token,
    isApproved,
    connectWallet,
    checkWalletAccounts,
    approve
}