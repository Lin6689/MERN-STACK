/*import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Recipes from './components/Recipes';
import RecipeDetail from './components/RecipeDetail'; // Naya component import karein

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </>
  );
}

export default App;*/

import React, { useState } from 'react'
import {Routes, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';

function App  ()  {

  const [cart, setCart] = useState([]);

  
  return (
  <>
  <Navbar />
<Routes >
  
  <Route path='/' element={<Hero/>} ></Route>
  <Route path='/products' element={<Products/>} ></Route>
  <Route path='/product/:id' element={<ProductDetail/>}></Route>
  
</Routes>
  </>
  )
}

export default App

/*import React from 'react'
import Image from './components/Image'
import Cart from './components/Cart'
function App  () {
  return (
    
    <>
    <Cart></Cart>
    <Image/>
    </>
   
  )
}

export default App*/