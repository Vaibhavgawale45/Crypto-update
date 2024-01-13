import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router  } from 'react-router-dom';
import App from './App';
import './index.css'
import { DataProvider } from './Context/DataContext'
import { DataProviders } from './Context/Trending';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <DataProviders>
    <DataProvider>
       <App />
    </DataProvider>
    </DataProviders>
   
     
    
   </Router>
    
  
);


