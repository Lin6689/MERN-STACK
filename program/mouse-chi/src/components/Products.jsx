import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes));
  }, []);

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-gray-800'>All Recipes</h2>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {recipes.map((recipe) => {
          const visibleIngredients = recipe.ingredients.slice(0, Math.ceil(recipe.ingredients.length / 2));

          return (
            <div key={recipe.id} className='bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between'>
              <div>
                <img src={recipe.image} alt={recipe.name} className='w-full h-48 object-cover' />
                <div className='p-4'>
                  <h3 className='font-bold text-lg mb-2 line-clamp-1'>{recipe.name}</h3>
                  <p className='text-xs font-semibold text-gray-500 mb-1'>Ingredients:</p>
                  <ul className='text-sm text-gray-600 list-disc list-inside space-y-1'>
                    {visibleIngredients.map((item, index) => (
                      <li key={index} className='line-clamp-1'>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className='p-4 pt-0'>
                <button 
                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                  className='w-full text-blue-600 text-sm font-medium py-2 px-4 rounded-lg'
                >
                  See More...
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Recipes;
/*import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";




function Products ()  {

  const [products, setProducts] = useState([]);

  useEffect(() => {
  fetch(`https://fakestoreapi.com/products`)
  .then((res) => res.json())
  .then((data) => setProducts(data))
}, []);

  return (
    <div className='px-10 py-16'>
      <div className='grid md:grid-cols-4 gap-4'>
        {products.map ((product) => (
          <div key={product.id} className='rounded-xl border-2 text-center'>
            <img src={product.image} className='object-contain w-full h-50 mx-auto'></img>
            <h1 className='font-bold text-center mt-3 mx-auto'>{product.title}</h1>
            <Link className='bg-blue-500 text-center px-10 py-0 mt-5' to={`/product/${product.id}`} >See more</Link>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default Products; */