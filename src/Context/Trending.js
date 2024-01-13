// DataContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const DataContext = createContext();

const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

const DataProviders = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, { data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/search/trending');
        const data = await response.json();
        dispatch({ type: 'SET_DATA', payload: data.coins || [] });
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
    throw new Error('useData must be used within a DataProviders');
  }
  return context;
};

export { DataProviders, useData };
