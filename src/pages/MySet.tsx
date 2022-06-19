import React, { useEffect, useState } from 'react'

import ship from '../assets/ship.svg'

const rarity = [
  'common',
  'uncommon',
  'rare',
  'mythical',
  'legendary',
  'immortal',
  'ancient',
  'gold'
]

const colors = [
  '#b0c3d9',
  '#5e98d9',
  '#4b69ff',
  '#8847ff',
  '#d32ce6',
  '#b28a33',
  '#eb4b4b',
  'gold'
]

const Ship = ({url, name, unlocked, color}: {url: string, name: string, unlocked: boolean, color: string}) => {
  return <div className={` m-1 w-[128px] pt-4 rounded-md flex flex-col items-center bg-black`}>
    <img src={url} className="w-[64px]" />
    <p className="text-white text-xs mt-2">{name.toUpperCase()}</p>
    <button className={`btn btn-xs text-white rounded-md w-11/12 mt-4 m-1 ${unlocked? 'bg-black' : 'bg-primary'}`}>{unlocked ? "unlocked" : "get" }</button>
  </div>
}

const MySet = () => {
  const [ships, setShips] = useState<any[]>([])

  const load = () => {
    
    
    const assets = rarity.map((rar) => require(`../assets/ships/ship-${rar}.png`))
    setShips(assets)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="m-auto max-w-5xl">

      <div className="flex flex-col lg:flex-row">
        <section className="w-full lg:w-1/3">
          <h2>Your stats 📘</h2>
          <p>Total score: {localStorage.spacebit_total_score || 0}</p>
        </section>

        <section className="w-full lg:w-1/3">
          <h2>Current streak 🏅</h2>
          <p >
            Each streak number adds a 0.1 multiplier to your game score.
            Play at least once game per day to earn the streak.
          </p>
          {
            localStorage.spacebit_streak ? 
            <p className="text-primary text-xl mt-4">
              Your current streak is <strong>{localStorage.spacebit_streak}</strong> 🏆
            </p> :
            <p className="text-primary">
              You dont have any streak. 
            </p> 
          }
        </section>

        <section className="w-full lg:w-1/3">
          <h2>Current ship 🚀</h2>
          <div className="bg-black w-[256px] p-4 m-2 rounded-md shadow-lg shadow-primary">
            <img className="" src={ships[4]} />
            <p className="text-white text-center mt-2">{rarity[4].toLocaleUpperCase()}</p>
          </div>
        </section>
      </div>

        <section>
          <h2>Current progress 📈</h2>
          
          <p>You need <strong>234</strong> points for next level</p>
          <ul className="w-full steps steps-vertical lg:steps-horizontal">
            {ships.map((url, i) => <li className={`step text-sm ${i < 3? 'step-primary' : ''}`}>
              <span>{rarity[i].toUpperCase()}</span>
            </li> )}
          </ul>
        </section>

        <section>
          <h2>All unlockables 🎖🎖🎖</h2>
          <div className='w-full flex flex-row lg:justify-center lg:flex-row'>
            {ships.map((url, i) => <Ship color={colors[i]} unlocked={i < 3} url={url} name={rarity[i]} />  )}
          </div>
        </section>
        
    </div>
  )
}

export default MySet