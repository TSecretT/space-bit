import React, { useEffect, useState } from 'react'
import { approve, checkWalletAccounts, connectWallet, isApproved } from '../contracts';

const Home = () => {
    const [wallet, setWallet] = useState<string>();
    const [approved, setApproved] = useState<boolean>();
    const [connecting, setConnecting] = useState<boolean>(false);

    const loadWallet = async () => {
        const wallet = await checkWalletAccounts();
        setWallet(wallet)

        const approved = await isApproved(wallet);
        setApproved(approved)
    }

    useEffect(() => {
        loadWallet()
    }, [])
    

    const onWalletConnect = async () => {
        setConnecting(true);
        const wallet = await connectWallet();
        if (wallet) {
            await approve()
        }
    }



    return (
        <div>
            <section>
                <div className="px-4 py-32 mx-auto lg:h-screen lg:items-center lg:flex">
                    <div className="max-w-xl mx-auto text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        SpaceBit Marketplace
                        <strong className="font-extrabold text-primary sm:block">
                        Play games. Win skins
                        </strong>
                    </h1>

                    <p className="mt-4 sm:leading-relaxed sm:text-xl">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {
                            wallet && approved? 
                            <button disabled className="block px-12 py-3 text-sm rounded-md font-medium bg-green-600" onClick={onWalletConnect}>
                                Connected {'&'} Approved
                            </button> :
                            <button disabled={connecting} className="block px-12 py-3 text-sm rounded-md font-medium btn-primary" onClick={onWalletConnect}>
                                Connect wallet
                            </button> 
                        }

                        <a className="block px-12 py-3 text-sm rounded-md font-medium btn-outline" href="/marketplace">
                            Visit marketplace
                        </a>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home;