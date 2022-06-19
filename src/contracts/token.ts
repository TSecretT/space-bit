import Web3 from 'web3'
import { toBN } from 'web3-utils'
import { BigNumber } from 'bignumber.js'

import TOKEN_ABI from './token.json';

BigNumber.set({ DECIMAL_PLACES: 18 })

export class Token {
    web3: Web3;
    address: string;
    contract: any;
    defaultGasPrice: number;
    currentWindow: any = window
    CONTRACT_ABI: any = TOKEN_ABI
    
	constructor(address: string) {
		this.web3 = new Web3(this.currentWindow.ethereum);
		this.address = address;
		this.contract = new this.web3.eth.Contract(this.CONTRACT_ABI, address);
		this.defaultGasPrice = 20000000000;
	}

    async gasPrice() {
		return await this.web3.eth.getGasPrice() || this.defaultGasPrice;
	}

	async getReward(sender: string, amount: number, callback: any){
        const prec: any = new BigNumber(10).pow(new BigNumber(18));
		let weiAmount: any = new BigNumber(amount).times(prec);
		let gasPrice = await this.gasPrice();
		const tx = this.contract.methods.getreward(toBN(weiAmount));
		let gasLimit = 150000;
		try {
			gasLimit = await tx.estimateGas({ value: 0, from: sender, to: this.address });
		} catch(err) {
			console.log("Gas limit error", err)
		}
		return tx.send({
			from: sender,
			gasPrice: gasPrice,
			gas: Math.round(gasLimit * 1.1)
		}, (err: any, txHash: string) => callback(err, txHash) );
    }
}

export default Token;