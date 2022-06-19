import Web3 from 'web3'
import { toBN } from 'web3-utils'
import { BigNumber } from 'bignumber.js'

import NFT_ABI from './nft.json';

BigNumber.set({ DECIMAL_PLACES: 18 })

export class NFT {
    web3: Web3;
    address: string;
    contract: any;
    defaultGasPrice: number;
    currentWindow: any = window
    CONTRACT_ABI: any = NFT_ABI
    
	constructor(address: string) {
		this.web3 = new Web3(this.currentWindow.ethereum);
		this.address = address;
		this.contract = new this.web3.eth.Contract(this.CONTRACT_ABI, address);
		this.defaultGasPrice = 20000000000;
	}

	fromBN(amount: any){
		return amount.c[0]
	}

	setProvider(provider: any) {
		this.web3.setProvider(provider)
	}

	async balanceOf(address: string, id: string){
		return await this.contract.methods.balanceOf(address, id).call()
	}

	async gasPrice() {
		return await this.web3.eth.getGasPrice() || this.defaultGasPrice;
	}

	async totalSupply() {
		return await this.contract.methods.totalSupply().call();
	}

	async price(tokenID: string) {
		return await this.contract.methods.price(tokenID).call();
	}

	async listedMap(tokenID: number) {
		return await this.contract.methods.listedMap(tokenID).call();
	}

	async redeemShip(sender: string, callback: any){
		let gasPrice = await this.gasPrice();
		const tx = this.contract.methods.get_freespaceship();
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

	async getIds(){
		return await this.contract.spaceship_ids;
	}

	async getPrices(){
		return false
	}
}

export default NFT;