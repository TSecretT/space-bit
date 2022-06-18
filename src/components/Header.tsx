import { useEffect, useState } from "react";
import { checkWalletAccounts } from "../contracts";

const Header = () => {
    const [wallet, setWallet] = useState<string>();

    const loadWallet = async () => {
        const wallet = await checkWalletAccounts();
        setWallet(wallet)
        console.log(wallet)
    }

    useEffect(() => {
        loadWallet()
    }, [])

    return (
        <div className="w-full flex flex-col items-center p-2">
            <div className="relative flex flex-row w-3/4 space-x-10 items-center">
                <span className='text-2xl text-primary font-bold'>SpaceBit</span>
                <a href='/'>Home</a>
                <a href='/marketplace'>Marketplace</a>
                <a href='/set'>My set</a>
                <a href='/game'>Game</a>
                

                <button className="btn btn-sm absolute right-0">...{wallet?.slice(wallet.length - 5)}</button>
            </div>
        </div>
    )
}

export default Header;