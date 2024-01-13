// CryptoInfo.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ payload, label, active, currency = 'usd' }) => {
  if (active && payload && payload.length > 0) {
    return (
      <div className="custom-tooltip">
        <p className="label text-sm text-cyan">{`${label} : ${new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: currency,
          minimumFractionDigits: 5,
        }).format(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

const ChartComponent = ({ data, currency, type }) => {
  return (
    <ResponsiveContainer height={400}>
      <LineChart data={data}>
        <CartesianGrid stroke="#323232" />
        <XAxis dataKey="date" />
        <YAxis dataKey={type} domain={['auto', 'auto']} />
        <Tooltip content={<CustomTooltip />} currency={currency} cursor={false} wrapperStyle={{ outline: 'none' }} />
        <Legend />
        <Line type="monotone" dataKey={type} stroke="#3B82F6" strokeWidth="1px" />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CryptoInfo = ({ currency }) => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [type, setType] = useState('prices');
  const [days, setDays] = useState(7);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoinData(response.data);
      } catch (error) {
        console.error('Error fetching coin data:', error);
      }
    };

    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        );
        const convertedData = response.data.prices.map((item) => ({
          date: new Date(item[0]).toLocaleDateString(),
          prices: item[1],
        }));
        setChartData(convertedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchCoinData();
    fetchChartData();
  }, [id, days]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="container mx-auto mt-8 flex">
      {coinData && chartData ? (
        <div className="bg-white p-8 w-[500px]">
          <div className="flex items-center justify-between ">
            <div>
              <img
                src={coinData.image.large}
                alt={`${coinData.name} logo`}
                className="w-28 h-28 object-cover rounded-full"
              />
              <h1 className="text-4xl font-bold mb-4 pt-6">{coinData.name}</h1>
              <p className="text-gray-800 mb-4 font-semibold">
                {showFullDescription
                  ? coinData.description?.en
                  : coinData.description?.en.substring(0, 300)}...
                {!showFullDescription ? (
                  <button
                    className="text-blue-500 hover:underline focus:outline-none"
                    onClick={toggleDescription}
                  >
                    Read More
                  </button>
                ) : (
                  <button
                    className="text-blue-500 hover:underline focus:outline-none"
                    onClick={toggleDescription}
                  >
                    Read Less
                  </button>
                )}
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-4 font-semibold text-xl">Rank: {coinData.market_data.market_cap_rank}</p>
          <p className="text-gray-700 mb-4 ">
            <span className="font-semibold text-xl">Current Price : </span>
            <span className="text-xl">
              {new Intl.NumberFormat('en-US', {
                currency: 'usd',
                style: 'currency',
              }).format(coinData.market_data.current_price.usd)}
            </span>
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-semibold text-xl">Market Cap: </span>
            <span className="text-xl">
              {new Intl.NumberFormat('en-US', {
                currency: 'usd',
                style: 'currency',
              }).format(coinData.market_data.market_cap.usd)}
            </span>
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="w-full h-[60%] mt-48">
        <ChartComponent data={chartData} currency={currency} type={type} />
        <div className="flex">
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              type === 'prices' ? 'bg-gray-600 text-black' : 'bg-white text-black'
            }`}
            onClick={() => setType('prices')}
          >
            Price
          </button>
         
           
        
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              days === 7 ? 'bg-gray-600 text-black' : 'bg-white text-black'
            }`}
            onClick={() => setDays(7)}
          >
            7d
          </button>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              days === 14 ? 'bg-gray-600 text-black' : 'bg-white text-black'
            }`}
            onClick={() => setDays(14)}
          >
            14d
          </button>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 bg-opacity-25 rounded capitalize ${
              days === 30 ? 'bg-gray-600 text-black' : 'bg-white text-black'
            }`}
            onClick={() => setDays(30)}
          >
            30d
          </button>
        </div>
      </div>
    </div>
  );
};

export default CryptoInfo;
