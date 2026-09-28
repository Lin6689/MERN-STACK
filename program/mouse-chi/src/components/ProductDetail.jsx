import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) {
    return <div className='text-center py-20 text-xl'>Loading...</div>;
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <button 
        onClick={() => navigate(-1)} 
        className='mb-6 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-sm font-medium'
      >
        ← Back
      </button>

      <div className='bg-white border rounded-2xl overflow-hidden shadow-lg p-6'>
        <h1 className='text-3xl font-bold mb-4 text-gray-800'>{recipe.name}</h1>
        
        <img src={recipe.image} alt={recipe.name} className='w-full h-96 object-cover rounded-xl mb-6 shadow-md' />

        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded-xl text-center'>
          <div>
            <p className='text-xs text-gray-500 font-bold'>Prep Time</p>
            <p className='font-semibold'>{recipe.prepTimeMinutes} mins</p>
          </div>
          <div>
            <p className='text-xs text-gray-500 font-bold'>Cook Time</p>
            <p className='font-semibold'>{recipe.cookTimeMinutes} mins</p>
          </div>
          <div>
            <p className='text-xs text-gray-500 font-bold'>Servings</p>
            <p className='font-semibold'>{recipe.servings}</p>
          </div>
          <div>
            <p className='text-xs text-gray-500 font-bold'>Calories</p>
            <p className='font-semibold'>{recipe.caloriesPerServing}</p>
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='text-xl font-bold mb-3 text-gray-800'>Ingredients</h3>
          <ul className='list-disc list-inside space-y-1 text-gray-700'>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className='text-xl font-bold mb-3 text-gray-800'>Instructions</h3>
          <ol className='list-decimal list-inside space-y-2 text-gray-700'>
            {recipe.instructions.map((step, index) => (
              <li key={index} className='leading-relaxed'>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
/*import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function ProductDetail  () {

  const {id} = useParams();
  const[product, setProduct] = useState([]);


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => setProduct(data))
  }, [id]);

  return (
    <div className='max-w-4xl'>
      <img src={product.image} className='w-full h-50'></img>
      <h1>{product.title}</h1>
    </div>
  )
}

export default ProductDetail;*/