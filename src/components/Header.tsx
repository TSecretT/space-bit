import { useEffect, useState } from "react";
import { checkWalletAccounts, contract, nft } from "../contracts";
import { freeSkinRedeemed, myWallet } from "../utils";

const Header = () => {
    const [wallet, setWallet] = useState<string>();
    const [freeRedeemed, setFreeRedeemed] = useState<boolean>(true);

    const loadWallet = async () => {
        const wallet = await checkWalletAccounts();
        setWallet(wallet)
        localStorage.setItem('spacebit_wallet', wallet)
    }

    const checkFreeRedeemed = async () => {
        setFreeRedeemed(await contract.balanceOf(myWallet(), 1) != '0')
    }
    
    const onRedeemCallback = (err: any, txHash: string) => {
        console.log(txHash);
        localStorage.setItem('spacebit_redeemed', "1")
        window.location.reload()
    }

    const onRedeem = async () => {
        await nft.redeemShip(myWallet(), onRedeemCallback)
    }

    const onSignOut = () => {
        localStorage.clear()
        window.location.reload()
    }

    useEffect(() => {
        loadWallet()
        checkFreeRedeemed()
    }, [])

    return (
        <>
            {
                freeRedeemed ? null : 
                    <div className="relative w-full px-4 py-3 text-white bg-primary pr-14">
                    <p className="text-sm font-medium text-left sm:text-center">
                        Get your first free playable skin!

                    <button onClick={onRedeem} className="underline"> Click here &rarr; </button>
                    </p>
                </div>
            }
            <div className="w-full flex flex-col items-center p-2">
                
                <div className="relative flex flex-row w-11/12 lg:w-3/4 space-x-10 items-center">
                    <a href='/' className='text-2xl text-primary font-bold'>SpaceBit</a>
                    <div className="hidden lg:flex flex-row items-center space-x-10">
                        <a href='/marketplace'>Marketplace</a>
                        <a href='/set'>My set</a>
                        <a href='/game'>Game</a>
                    </div>

                    <div className="btn-group absolute right-0 hidden lg:flex">
                        <button className="btn btn-sm">...{wallet?.slice(wallet.length - 5)}</button>
                        <button className="btn btn-sm" onClick={onSignOut}>Sign out</button>
                    </div>
                    
                    <div className="dropdown dropdown-end lg:hidden absolute right-0">
                        <label tabIndex={0} className="btn m-1 btn-sm">Menu</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href='/marketplace'>Marketplace</a></li>
                            <li><a href='/set'>My set</a></li>
                            <li><a href='/game'>Game</a></li>
                            <li><button onClick={onSignOut}>Sign out</button></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;