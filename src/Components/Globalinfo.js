import  { useEffect, useState } from 'react'

const Globalinfo = (param) => {

    
    const [marketData, setMarketData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.coinranking.com/v2/coins');
          const data = await response.json();
  
          console.log('API response:', data); // Log the API response for debugging
  
          if (data && data.data && data.data.stats) {
            const {
              totalCoins,
              totalExchanges,
              totalMarketCap,
              total24hVolume,
              totalMarkets,
            } = data.data.stats;
  
            setMarketData({
              totalCryptocurrencies: totalCoins,
              totalExchanges,
              totalMarketCap,
              total24hVolume,
              totalMarkets,
            });
          } else {
            setError('Invalid data structure in the API response.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setError('Error fetching data. Please check the console for details.');
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
       
        {error && <p>{error}</p>}
        {marketData && (
          <div>
            <h1 className='flex font-semibold text-2xl pl-20  items-center justify-center pt-10 '>
        Global Crypto Stats</h1>

        <div class="grid grid-cols-2 gap-4  pt-10 w-[1080px] mx-auto pl-80  ">
          <div>
            <div className='font-semibold text-xl'>Total Cryptocurrencies</div>
            <div>
            {new Intl.NumberFormat('EN-US', {
                  
                }).format(marketData.totalCryptocurrencies)}</div>
          </div>
          <div>
            <div className='font-semibold text-xl'>Total Exchanges</div>
            <div>{marketData.totalExchanges}</div>
          </div>
          <div>
            <div className='font-semibold text-xl'>Total Market Cap</div>
            <div>
             {new Intl.NumberFormat('EN-US', {
                  style: 'currency',
                  currency: 'usd',
                }).format(marketData.totalMarketCap)}</div>
          </div>
          <div>
            <div className='font-semibold text-xl'>Total24h Volume</div>
            <div>
            {new Intl.NumberFormat('EN-US', {
                  style: 'currency',
                  currency: 'usd',
                }).format(marketData.total24hVolume)}</div>
          </div>
          <div>
            <div className='font-semibold text-xl'>Total Markets</div>
            <div>{marketData.totalMarkets}</div>
          </div>
          
          </div>
          </div>
        )}
      </div>
    );
 

   
  
};


export default Globalinfo
