import React from 'react'
import { useData } from '../Context/Trending';

const Trending = () => {
  const { data } = useData();

  const topTrendingCoins = data.slice(0, 10); // Get the top 10 trending coins

  return (
    <div className="container w-[1080px] mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 pb-10">Top 10 Trending Cryptocurrencies</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {topTrendingCoins.map((coin) => (
          <div key={coin.id} className="bg-white p-4 rounded shadow flex">
          
            <div>
            <h2 className="text-xl font-bold mb-2">{coin.item.name}</h2>
            <p>Market Cap Rank: {coin.item.market_cap_rank}</p>
            <p>Price (in BTC): {Number(coin.item.price_btc).toFixed(8) }</p>
            <p>Score: {coin.item.score+1}</p>
            </div>

            <img
              src={coin.item.large}
              alt={`${coin.item.name} icon`}
              className="w-40 h-40 mx-auto mb-2"
            />
            
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending
