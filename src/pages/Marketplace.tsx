import axios, { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'

const Marketplace = () => {
    const [items, setItems] = React.useState<any[]>([]);

    const load = async () => {
        const items = await axios.get('https://api.allorigins.win/raw?url=https://skinport.com/api/home')
        .then((res: AxiosResponse) => res.data.sales[0].items)
        .then((items: any[]) => items.map((item: any) => { return { name: item.marketName, price: item.salePrice, image: `https://community.cloudflare.steamstatic.com/economy/image/class/${item.appid}/${item.classid}/256x128` } }))
        .catch(err => { console.error(err) })
            
        if (items) setItems(items)
    }

    useEffect(() => {
        load()
    }, [])

  return (
    <div className="p-5 w-full">
        
        <div className="w-full flex flex-row flex-wrap justify-center">
            {items.map((item, i) => 
                <div key={item} className="flex flex-col m-2 p-2 shadow-2xl w-52 rounded-md border-gray border-2 space-y-2 min-h-[256px]">
                    <img className='' src={item.image} />
                    <p className="h-24">{item.name}</p>
                    <div className="mt-10 flex flex-row items-center justify-between">
                        <p className="">{Math.floor(item.price / 1000)} coins</p>
                        <button className="btn btn-xs btn-primary">Buy</button>
                    </div>
                </div>    
            )}
        </div>

    </div>
  )
}

export default Marketplace