import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='bg-gray-800  h-20 ' >
        
        
        
       <div className='flex  justify-evenly w-[1080px] mx-auto'>


            <div class="text-white  py-4 relative group flex space-x-2">
              <img src={require('./cryptocurrency.png')} alt="error" className='w-10 h-10 '/>
            <p className='text-3xl font-semibold '>
              <span className='text-yellow-500'>C</span>ypto
              <span className='text-yellow-500'>U</span>pdate
            </p>
            </div>

=
        <ul class="flex space-x-6  ">
            <li class="text-white  py-7 hover:text-blue-600 cursor-pointer 
            transition-all duration-200 relative group">
               <NavLink to="/" className="nav-link  ">Home</NavLink>
              
            </li>
            
            <li class="text-white  py-7 hover:text-blue-600 cursor-pointer 
            transition-all duration-200 relative group">
               <NavLink to="/cryptocurrencies"  className="nav-link  ">Cryptocurrencies</NavLink>
            </li>

            <li class="text-white  py-7 hover:text-blue-600 cursor-pointer 
            transition-all duration-200 relative group">
                <NavLink to="/Trending" className="nav-link  " >Trending</NavLink>
            </li>
            
            <li class="text-white  py-7 hover:text-blue-600 cursor-pointer 
            transition-all duration-200 relative group">
            <NavLink to="/news" className="nav-link ">News</NavLink>
            </li>

        </ul> 
       </div>
          
      
    </div>
  )
}

export default Navbar
