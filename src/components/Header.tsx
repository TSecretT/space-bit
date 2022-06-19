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
            <div className="relative flex flex-row w-11/12 lg:w-3/4 space-x-10 items-center">
                <a href='/' className='text-2xl text-primary font-bold'>SpaceBit</a>
                <div className="hidden lg:flex flex-row items-center space-x-10">
                    <a href='/marketplace'>Marketplace</a>
                    <a href='/set'>My set</a>
                    <a href='/game'>Game</a>
                </div>

                <button className="btn btn-sm absolute right-0 hidden lg:flex">...{wallet?.slice(wallet.length - 5)}</button>
                
                <div className="dropdown dropdown-end lg:hidden absolute right-0">
                    <label tabIndex={0} className="btn m-1 btn-sm">Menu</label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a href='/marketplace'>Marketplace</a></li>
                        <li><a href='/set'>My set</a></li>
                        <li><a href='/game'>Game</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header;