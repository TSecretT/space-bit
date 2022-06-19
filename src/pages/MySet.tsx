import React, { useEffect, useState } from 'react'
import { claimResults, myResults } from '../api/api'
import { getUser, onGoogleLogin } from '../api/firebase'

import ship from '../assets/ship.svg'
import { contract, nft, token } from '../contracts'
import { myWallet } from '../utils'

const MULTIPLIER = 0.1

const ships = [
  {
    name: 'common',
    color: '#b0c3d9',
    id: 1,
    price: 50
  },
  {
    name: 'uncommon',
    color: '#5e98d9',
    id: 2,
    price: 100
  },
  {
    name: 'rare',
    color: '#4b69ff',
    id: 3,
    price: 300
  },
  {
    name: 'mythical',
    color: '#8847ff',
    id: 4,
    price: 500
  },
  {
    name: 'legendary',
    color: '#d32ce6',
    id: 5,
    price: 1000
  },
  {
    name: 'immortal',
    color: '#b28a33',
    id: 6,
    price: 5000
  },
  {
    name: 'ancient',
    color: '#eb4b4b',
    id: 7,
    price: 10000
  },
  {
    name: 'gold',
    color: 'gold',
    id: 8,
    price: 100000
  },
]

const MySet = () => {
  const [selectedShip, setSelectedShip] = useState<string>(localStorage.spacebit_ship);
  const [score, setScore] = useState<number>(0);
  const [results, setResults] = useState<number>();
  const [unlocks, setUnlocks] = useState<string[]>();

  const Ship = ({url, name, unlocked, id, price }: {url: string, name: string, unlocked: boolean, id: number, price: number}) => {
    
    const onBuyCallback = (err: any, txHash: string) => {
      console.log(txHash)
    }

    const onBuy = async () => {
      await nft.buy(myWallet(), id, onBuyCallback)
    }

    return <div className="m-1 w-[256px] lg:w-[128px] pt-4 rounded-md flex flex-col items-center bg-black hover:-translate-y-2 transition-all duration-150">
      <img src={url} className="w-[128px] lg:w-[64px]" />
      <p className="text-white text-xs mt-2">{name.toUpperCase()}</p>
      <p className="text-white text-xs mt-2">{price}</p>
      
      {
        unlocked ? 
        <button onClick={() => onShipSelect(url) } className="btn btn-xs text-white rounded-md w-11/12 mt-4 m-1 bg-black">unlocked</button>
        : score && (score >= price) ? 
          <button onClick={() => onBuy()} className="btn btn-xs text-white rounded-md w-11/12 mt-4 m-1 bg-primary">buy</button>
        : <button className="btn btn-xs text-white rounded-md w-11/12 mt-4 m-1 bg-primary">{score}/{price}</button>
      }
    </div>
  }

  const onShipSelect = (url: string) => {
    setSelectedShip(url)
    localStorage.setItem('spacebit_ship', url)
  }

  const getScores = async () => {
    const promises = ships.map((ship) => contract.balanceOf(myWallet(), ship.id))
    return Promise.all(promises)
  }

  const load = async () => {
    
    const score = await contract.balanceOf(localStorage.spacebit_wallet, 1)
    setScore(score);

    const assets = ships.map((ship) => require(`../assets/ships/ship-${ship.name}.png`))
    // setShips(assets);

    const results = await myResults(myWallet())
    .then((results) => results.filter((result: any) => (!result.checked && result.score)))
    .then((results) => results.reduce((total: any, next: any) => total + next.score, 0))
    setResults(results);

    setUnlocks(await getScores())
  }

  const onClaim = async () => {
    await token.getReward(myWallet(), results, async (err: any, txHash: string) => {
      if(txHash) await claimResults(myWallet())
		})
  }

  

  useEffect(() => {
    load()

    // console.log(nft.getPrices())
  }, [])

  return (
    <div className="m-auto max-w-5xl">

      <div className="flex flex-col lg:flex-row">
        <section className="w-full lg:w-1/3">
          <h2>Your stats 📘</h2>
          <p>Total SBit balance: {score || 0}</p>

          {(results && results > 0) ? <div className="my-4">
            <p>You have <strong>{results}</strong> unclaimed SBits</p>
            <button onClick={onClaim} className="btn btn-sm btn-primary my-2">Claim</button>
          </div> : null}
        </section>

        <section className="w-full lg:w-1/3">
          <h2>Current streak 🏅</h2>
          <p >
            Each streak number adds <strong>{`x${ 1 + (localStorage.spacebit_streak || 1) * MULTIPLIER}`}</strong> multiplier to your game score.
            Play at least once game per day to earn the streak.
          </p>
          { 
            // !getUser() ? 
            // <div className="p-2">
            //   <p>In order to use streak system, you need to connect Google account</p>
            //   <button onClick={() => onGoogleLogin()} className="btn btn-block btn-error text-white btn-sm m-1">Connect Google</button>
            // </div> : 
            localStorage.spacebit_streak ? 
            <p className="text-primary text-lg mt-4">
              Your current streak is <strong>{localStorage.spacebit_streak}</strong> (x{1 + (localStorage.spacebit_streak || 1) * MULTIPLIER}) 🏆
            </p> :
            <p className="text-primary">
              You dont have any streak. 
            </p> 
          }
        </section>

        <section className="w-full lg:w-1/3">
          <h2>Current ship 🚀</h2>
          <div className="bg-black w-[256px] p-4 m-2 rounded-md shadow-lg shadow-primary">
            <img className="" src={selectedShip} />
            <p className="text-white text-center mt-2">{ships[4].name.toLocaleUpperCase()}</p>
          </div>
        </section>
      </div>

        <section>
          <h2>Current progress 📈</h2>
          
          {/* <p>You need <strong>234</strong> points for next level</p> */}
          <ul className="w-full steps text-white steps-vertical lg:steps-horizontal">
            {ships.map((ship, i) => <li className={`step text-sm ${unlocks && unlocks[i] != '0'? 'step-primary' : ''}`}>
              <span>{ship.name.toUpperCase()}</span>
            </li> )}
          </ul>
        </section>

        <section>
          <h2>All unlockables 🎖🎖🎖</h2>
          <div className='w-full flex flex-col items-center lg:justify-center lg:flex-row'>
            {ships.map((ship, i) => <Ship price={ship.price} id={ship.id} unlocked={unlocks && unlocks[i] != '0' ? true : false} url={require(`../assets/ships/ship-${ship.name}.png`)} name={ship.name} />  )}
          </div>
        </section>
        
    </div>
  )
}

export default MySet