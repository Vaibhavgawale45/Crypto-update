// DataContext.js

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, { data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        dispatch({ type: 'SET_DATA', payload: response.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};


const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export { DataProvider, useData };
