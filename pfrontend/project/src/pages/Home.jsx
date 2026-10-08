import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[#FAF8F6] dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-300 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* ========== HERO SECTION ========== */}
      <section className="relative h-[65vh] flex items-center overflow-hidden">
        {/* Background Image */} 
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover scale-105"
          />
          {/* Theme-Adaptive Overlay */}
          <div className="absolute inset-0 bg-slate-950/65 dark:bg-slate-950/85"></div>
        </div>
  
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <div className="max-w-2xl text-white">
            
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 font-['Playfair_Display',serif]">
              Elevate Your Everyday Style
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-xl font-light leading-relaxed">
              Discover premium quality products crafted for modern living. 
              Free shipping on orders over $50. Easy returns within 30 days.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="bg-white text-slate-950 font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition shadow-lg shadow-black/10 tracking-wide text-sm"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        </div>
      </section>
     

      {/* ========== CATEGORY SHOWCASE ========== */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 -mt-25">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              name: "Shoes",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo95fpcH6sGw6jua2L3JVRaNi1VtADD14HIBqi6_uQw7wCZKmDSid0-rnr&s=10",
            },
            {
              name: "Accessories",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZ374du3YxH2M9r5BvQjqBzRaA8Npjx6wUo59ATCpiQSO8tJxTUo0miE&s=10",
            },
            {
              name: "Shirts",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGxT4zI5IsBVRGI2F13qLVjF_B1SvJqEguavca33P_FfDyroWOfOu0pigq&s=10",
            },
            {
              name: "Pants",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlauzz6mVKktm4IvvS0KuOszOh4NycgfuIZT-74BEIyg&s=10",
            },
            {
              name: "Jackets",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShYPWUgpp3qqkrdMNLIZfSfoKC1o4PkfGzPlUVoB0KDXJC4KtdAGUcsQNN&s=10",
            },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group relative rounded-2xl overflow-hidden h-80 shadow-sm hover:shadow-xl border border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 bg-white dark:bg-slate-900"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-white text-xl font-bold mb-1 tracking-tight font-['Playfair_Display',serif]">{cat.name}</h3>
                <span className="text-slate-300 text-xs font-semibold tracking-wider uppercase group-hover:underline">
                  Shop Now &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========== PROMO BANNER ========== */}
      <section className="pb-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm">
          <div className="grid md:grid-cols-2 items-stretch min-h-[400px]">
            {/* Left Text */}
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <span className="text-indigo-600 dark:text-indigo-400 text-xs uppercase tracking-[0.2em] font-extrabold mb-3">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 font-['Playfair_Display',serif]">
                Get 25% Off on Your First Order
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md font-light leading-relaxed">
                Sign up today and enjoy exclusive discounts, early access to sales, and priority shipping options.
              </p>
            </div>

            {/* Right Image */}
            <div className="hidden md:block h-full min-h-[400px]">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcTFuK3uBsQ5cPa0T05sAjhEq-qY38uAvGhW_jefe7JD4SG_TR0xfTIUA&s=10"
                alt="Promo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-24 bg-white/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-16">

            <h2 className="text-3xl text-red-900 font-extrabold tracking-tight mb-3 font-['Playfair_Display',serif]">Why Shop With Us</h2>
            <p className=" text-red-900 dark:text-slate-400 font-light">We make shopping simple, secure, and enjoyable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Premium Quality",
                desc: "Handpicked products from trusted brands worldwide.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
              },
              {
                title: "Fast Delivery",
                desc: "Get your orders delivered within 2-4 business days.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
              },
              {
                title: "24/7 Support",
                desc: "Our team is always ready to help you with anything.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636l3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                ),
              },
              {
                title: "Best Prices",
                desc: "Competitive pricing with regular exclusive deals.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-slate-50 dark:bg-slate-900/80 p-8 rounded-2xl shadow-sm border border-slate-200/80 dark:border-slate-800/80 hover:shadow-md transition text-center group"
              >
                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl flex items-center justify-center mx-auto mb-5 border border-indigo-100 dark:border-indigo-900/50 group-hover:scale-110 transition duration-300">
                  <svg className="w-6 h-6 text-red-900 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-bold text-red-900 text-lg mb-2 font-['Playfair_Display',serif]">{item.title}</h3>
                <p className="text-red-900 dark:text-slate-400 text-sm font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">

          <h2 className="text-3xl text-red-900 font-extrabold tracking-tight mb-3 font-['Playfair_Display',serif]">Stay in the Loop</h2>
          <p className="text-red-900 dark:text-slate-400 mb-8 font-light">
            Subscribe to get exclusive offers, new arrivals, and style inspiration delivered to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 transition shadow-sm font-normal"
            />
            <button
              type="submit"
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold px-8 py-3.5 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-sm text-sm tracking-wide"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}