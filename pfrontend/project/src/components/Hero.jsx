export default function Hero() {
  return (
    <section className="relative bg-gradient from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Discover Your Style
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8">
            Shop the latest trends in fashion, electronics & accessories. 
            Free shipping on orders over $50.
          </p>
          <button className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-full hover:bg-indigo-50 transition">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}