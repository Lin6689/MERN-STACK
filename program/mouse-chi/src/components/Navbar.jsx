/*import React from 'react'; 
import { Link } from 'react-router-dom'; 

function Navbar() { 
  return ( 
    <nav className="text-black bg-red-50 p-4 justify-between items-center flex"> 
      <h1 className="text-3xl text-white-600 font-bold">Food Recipes</h1> 
      <div className="flex gap-4 text-xl"> 
      <Link to="/" className='font-bold'>Hero</Link>
        <Link to="/recipes" className='font-bold'>Recipes</Link> 
        
      </div> 
    </nav> 
  ); 
} 

export default Navbar;*/
import React from 'react'
import {Link} from "react-router-dom";

function Navbar () {
  return (
    <nav className='sticky top-0 z-50 w-full p-4 bg-yellow-600 backdrop-blur-md text-black border-b-2 border-red-600 '>
      <div className='flex justify-between items-center font-bold'>
        <h1 className='text-3xl text-black tracking-wider drop-shadow-[0_2px_4px_rgba(234,179,8,0.4)]'>Comicon</h1>
        <div className='flex gap-6 text-1xl font-bold text-black'>
          <Link to="/" className='hover:text-yellow-400 transition-colors duration-200'>Home</Link>
          <Link to="/products" className='hover:text-yellow-400 transition-colors duration-200'>All comics</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar