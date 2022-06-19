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
    <div className="m-auto w-10/12">
        
        <div className="flex flex-row w-full justify-end mt-10">
            <button className="btn btn-primary btn-sm">Add item</button>
        </div>
        <div className="w-full flex flex-row flex-wrap justify-between">
            {items.map((item, i) => 
                <div key={item} className="flex flex-col my-2 p-2 shadow-2xl w-52 rounded-md border-gray border-2 space-y-2 min-h-[256px]">
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