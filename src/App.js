import React from 'react'
import Navbar from './Components/Navbar'
import {  Routes, Route } from 'react-router-dom';
import Homepage from './Components/Homepage'
import Cryptocurrencies from './Components/Cryptocurrencies'
import News from './Components/News'
import Trending from './Components/Trending'
import CryptoDetail from './Components/CryptoDetail'



const App = () => {
  return (
    <div className='app'>
        <div className='navbar'>
       <Navbar/>

       
        <Routes>
        
      
          <Route index element={<Homepage />} /> 
          <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
          <Route path="/Trending" element={<Trending />} />
          <Route path="/news" element={<News />} />
          <Route path="/cryptocurrencies/:id" element={<CryptoDetail />} />
        </Routes>
     
      
          

     

        </div>
        <div className='main'> 
                
        </div>
        <div className='footer'>

        </div>

    </div>
  )
}

export default App
