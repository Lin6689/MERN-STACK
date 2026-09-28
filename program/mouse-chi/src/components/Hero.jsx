/*import React from 'react'

function Hero() {
  return (
    <div className='w-full relative overflow-hidden bg-stone-50'>

      <div className='w-full h-[70vh] relative overflow-hidden flex items-center justify-center'>
        <img 
          src='https://static.vecteezy.com/system/resources/thumbnails/048/509/396/small_2x/blank-white-book-cover-mock-up-on-an-italian-kitchen-table-surrounded-by-fresh-herbs-and-italian-ingredients-photo.jpg' 
          className='w-full h-full object-cover absolute inset-0 brightness-75' 
          alt=""
        />
        
    
        <div className='absolute inset-0 bg-black/40'></div>

      
        <div className='relative z-10 text-white text-center px-4'>
          <h1 className='text-6xl font-extrabold tracking-wide drop-shadow-lg mb-4'>
            Recipe Book
          </h1>
          <p className='text-lg font-medium text-stone-200 max-w-xl mx-auto drop-shadow'>
            Discover, cook, and share the best handcrafted recipes from around the world.
          </p>
        </div>
      </div>


      <div className='max-w-6xl mx-auto px-4 -mt-16 relative z-20 pb-16'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          
        
          <div className='bg-white rounded-xl shadow-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300 border border-stone-100'>
            <div className='text-4xl mb-3'>🥗</div>
            <h3 className='text-xl font-bold text-stone-800 mb-2'>Fresh & Healthy</h3>
            <p className='text-stone-600 text-sm'>
              Light and nutritious meals packed with vibrant greens and herbs.
            </p>
          </div>

      
          <div className='bg-white rounded-xl shadow-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300 border border-stone-100'>
            <div className='text-4xl mb-3'>🍝</div>
            <h3 className='text-xl font-bold text-stone-800 mb-2'>Italian Classics</h3>
            <p className='text-stone-600 text-sm'>
              Authentic pasta, rich sauces, and traditional kitchen favorites.
            </p>
          </div>

          
          <div className='bg-white rounded-xl shadow-xl p-6 text-center hover:-translate-y-1 transition-transform duration-300 border border-stone-100'>
            <div className='text-4xl mb-3'>🍰</div>
            <h3 className='text-xl font-bold text-stone-800 mb-2'>Sweet Desserts</h3>
            <p className='text-stone-600 text-sm'>
              Indulgent bakes, pastries, and treats to satisfy your sweet tooth.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default */ 
/*import React from 'react'

function Hero () {
  return (
    <>
    <div className='w-full h-[68vh] relative overflow-hidden'>
      <img src='https://static.vecteezy.com/system/resources/thumbnails/048/509/396/small_2x/blank-white-book-cover-mock-up-on-an-italian-kitchen-table-surrounded-by-fresh-herbs-and-italian-ingredients-photo.jpg' className='object-cover w-full h-full absolute inset-0'></img>

      <div className='absolute inset-0'></div>
      <div className='relative z-10 text-center mt-35 font-bold text-3xl'>
        <h1>WeLcOmE</h1>
        
      </div>


      
    </div>
    


<div className='relative grid md:grid-cols-3 gap-7  -mt-16 z-20 text-black bg-green-300 p-8  mx-auto max-w-4xl overflow-hidden'>
  <div className='flex justify-center items-center'>hello</div>
   <div className='flex justify-center items-center'>hello</div> 
    <div className='flex justify-center items-center'>hello</div>
</div>
</>
  )
}

export default Hero*/
import React from 'react'

function Hero () {
  return (
    <>
    {/* Hero Banner Section */}
    <div className='w-full h-[70vh] items-center relative overflow-hidden'>
      <img 
        src='https://c4.wallpaperflare.com/wallpaper/451/794/543/comics-maguire-marvel-movies-wallpaper-preview.jpg' 
        alt='Spider-Man Hero Wallpaper' 
        className='w-full h-full object-cover absolute inset-0' 
      />
      <div className='relative z-20 text-4xl text-center mt-32 font-bold'>
        <h1 className='text-yellow-400 drop-shadow-[0_4px_10px_rgba(220,38,38,0.8)]'></h1>
      </div>
    </div>

    {/* Overlapping 3-Card Grid */}
    <div className='max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 relative z-20 text-center text-slate-100 justify-center items-stretch mx-auto px-4 pb-16'>
      <div className='p-6 bg-yellow-600 border-2 border-red-600 shadow-lg shadow-red-600/40 rounded-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between'>
        <h2 className='text-black font-bold mb-2 text-lg'>Hey there !!!!! IM PETER PARKER..</h2>
        <p className='text-black text-sm leading-relaxed'>DO U KNOW ME, RIGHT ? im just like u, im also confused that who m i...</p>
      </div>

      <div className='p-6  bg-yellow-600 border-2 border-red-600 shadow-lg shadow-red-600/40 rounded-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between'>
        <h2 className='text-black font-bold mb-2 text-lg'>Hey there !!!!! IM NOT SPIDERMAN..</h2>
        <p className='text-black text-sm leading-relaxed'>DO U KNOW ME, RIGHT ? im just like u, im also confused that who m i...</p>
      </div>

      <div className='p-6  bg-yellow-600 border-2 border-red-600 shadow-lg shadow-red-600/40 rounded-xl hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between'>
        <h2 className='text-black font-bold mb-2 text-lg'>Hey there !!!!! IM NOT MUTANT..</h2>
        <p className='text-black text-sm leading-relaxed'>DO U KNOW ME, RIGHT ? im just like u, im also confused that who m i...</p>
      </div>
    </div> 

    {/* Detailed Info Section */}
    <div className='bg-black text-zinc-300 py-12 px-4 '>
      <div className='grid grid-cols-1 md:grid-cols-2 max-w-6xl min-h-[70vh]  bg-zinc-950 rounded-xl overflow-hidden shadow-xl mx-auto'>
        <div className='h-64 md:h-full w-full'>
          <img 
            src='https://variety.com/wp-content/uploads/2023/01/MCDSPID_EC136.jpg?w=1000&h=667&crop=1&resize=1000%2C667' 
            alt='Spider-Man History' 
            className='w-full h-full object-cover' 
          />
        </div>
        <div className='p-8 flex flex-col justify-center gap-4 text-sm md:text-base leading-relaxed'>
          <h2 className='text-2xl font-bold text-yellow-400 border-b border-red-600/40 pb-2'>The Origins of Spider-Man</h2>
          <p>
            Spider-Man is a famous comic book superhero created by Stan Lee and Steve Ditko. He first appeared in Marvel Comics' <em>Amazing Fantasy #15</em> in August 1962. His secret identity is Peter Parker, a young student who gains special powers after a radioactive spider bite.
          </p>
          <p>
            He lives by the core principle that <strong>"with great power comes great responsibility."</strong> Raised by his Aunt May and Uncle Ben in Queens, New York City, Lee and Ditko crafted a character dealing with the relatable struggles of adolescence, self-doubt, and adulthood.
          </p>
          <p>
            Equipped with superhuman strength, agility, a precognitive "spider-sense," and custom-built web-shooters, Spider-Man remains one of the most iconic pop-culture figures of all time.
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Hero;