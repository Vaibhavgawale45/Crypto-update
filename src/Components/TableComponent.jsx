// TableComponent.jsx
import React, { useState } from 'react';
import { useData } from '../Context/DataContext';
import { Link } from 'react-router-dom';

const TableComponent = () => {
  const { data } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(
    (coin) =>
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 pb-10">Cryptocurrency List</h1>

      {/* Search input */}
      <div className="mb-4 ">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by symbol or name"
          className="p-2 border rounded w-96  "
        />
      </div>

      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="p-2 border">Asset</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Total Volume</th>
            <th className="p-2 border">Market Cap Change </th>
            <th className="p-2 border">24H</th>
          </tr>
        </thead>
        <tbody className="min-w-full bg-white border border-gray-300">
          {filteredData.map((coin) => (
            <tr key={coin.id}>
              <td className="flex items-center uppercase py-4 pl-10 border-b">
                <img
                  className="w-[1.2rem] h-[1.2rem] mx-1.5"
                  src={coin.image}
                  alt={coin.name}
                />
                <span>
                  <Link to={`/${coin.id}`} className="cursor-pointer">
                    {coin.symbol}
                  </Link>
                </span>
              </td>

              <td className="p-2 border">{coin.name}</td>
              <td className="p-2 border">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'usd',
                }).format(coin.current_price)}
              </td>
              <td className="p-2 border">{coin.total_volume}</td>
              <td className="p-2 border">
                {Number(coin.market_cap_change_24h).toFixed(2)} %
              </td>
              <td
                className={
                  coin.market_cap_change_percentage_24h > 0
                    ? 'text-green-600 p-2 border'
                    : 'text-red-600 p-2 border'
                }
              >
                {Number(coin.market_cap_change_percentage_24h).toFixed(2)} %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
