import React, { useEffect, useState } from 'react'

function Image () {
    const[products, setProducts] = useState([]);
    

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }, []);
  return (
    <>
    <div className='w-full h-[68vh] relative overflow-hidden mt-3 '>
        <h1 className='text-center font-bold text-4xl'>Employee card</h1>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQONzTjiKfbs7Xs40rPDEmDE_uGOvJbI5yOKv8SNmqxCQ&s=10' className='w-70 h-70 object-cover ml-143 mt-10'></img>
       <div className='text-center mt-3 font-bold'>
        <h1 >Name : Mark wosky</h1>
        <p>Salary : 55$</p>
        <h2>Web development department</h2>
       </div>

    </div>
    
    <div className='py-10 px-18 -mt-19'>
        <div className='grid md:grid-cols-4 gap-4'>
            {products.map((product) => (
                <div key={product.id} className='rounded-xl border text-center'>
                    <img src={product.image} className='w-full h-50 object-contain'></img>
                    <h1 className='font-bold mx-auto '>{product.title}</h1>
                    <h2 className='mx-auto mt-3'>${product.price}</h2>
                    <h3 className='mx-auto'>{product.count}</h3>
                </div>
            ))}
        </div>
    </div>
    
    
    </>
    


  )
}

export default Image