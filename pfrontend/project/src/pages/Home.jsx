import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white">
     {/* ========== HERO SECTION ========== */}
<section className="relative h-[85vh] min-h-600px flex items-center overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop"
      alt="Hero Background"
      className="w-full h-full object-cover"
    />
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/50"></div>
  </div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div className="max-w-2xl text-white">
      <span className="inline-block bg-white/20 backdrop-blur-sm text-sm font-medium px-4 py-1.5 rounded-full mb-6">
        New Season Collection 2026
      </span>
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
        Elevate Your Everyday Style
      </h1>
      <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl">
        Discover premium quality products crafted for modern living.
        Free shipping on orders over $50. Easy returns within 30 days.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          to="/shop"
          className="bg-white text-indigo-700 font-semibold px-8 py-3.5 rounded-full hover:bg-indigo-50 transition shadow-lg"
        >
          Shop Now
        </Link>
        <Link
          to="/shop"
          className="border-2 border-white text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition"
        >
          Explore Collections
        </Link>
      </div>
    </div>
  </div>
</section>

      {/* ========== FEATURES / BENEFITS ========== */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">Free Shipping</h3>
              <p className="text-gray-500 text-sm">On all orders above $50</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">Easy Returns</h3>
              <p className="text-gray-500 text-sm">30-day hassle-free returns</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-1">Secure Payments</h3>
              <p className="text-gray-500 text-sm">100% protected checkout</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CATEGORY SHOWCASE ========== */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Shop by Category</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Explore our carefully curated collections designed for every lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Cards */}
            {[
              {
                name: "Electronics",
                image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=700&fit=crop",
                link: "/shop",
              },
              {
                name: "Fashion",
                image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=700&fit=crop",
                link: "/shop",
              },
              {
                name: "Home & Living",
                image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=700&fit=crop",
                link: "/shop",
              },
              {
                name: "Accessories",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=700&fit=crop",
                link: "/shop",
              },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={cat.link}
                className="group relative rounded-2xl overflow-hidden h-80 shadow-md hover:shadow-xl transition"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold mb-1">{cat.name}</h3>
                  <span className="text-white text-sm group-hover:underline">
                    →→→→→ Shop Now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== PROMO BANNER ========== */}
      <section className="py-10 -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to from-indigo-600 to-purple-600 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-10 md:p-14 text-white">
                <span className="text-indigo-800 text-sm font-medium uppercase tracking-wider">
                  Limited Time Offer
                </span>
                <h2 className="text-3xl text-indigo-800 md:text-4xl font-bold mt-3 mb-4">
                  Get 25% Off on Your First Order
                </h2>
                <p className="text-indigo-800 mb-8 max-w-md">
                  Sign up today and enjoy exclusive discounts, early access to sales, and free shipping.
                </p>
                <Link
                  to="/shop"
                  className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-full hover:bg-indigo-50 transition"
                >
                  Claim Offer
                </Link>
              </div>
              <div className="hidden md:block h-full min-h-320px">
                <img
                  src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop"
                  alt="Promo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Why Shop With Us</h2>
            <p className="text-gray-500">We make shopping simple, secure, and enjoyable.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Premium Quality",
                desc: "Handpicked products from trusted brands worldwide.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
              },
              {
                title: "Fast Delivery",
                desc: "Get your orders delivered within 2-4 business days.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                ),
              },
              {
                title: "24/7 Support",
                desc: "Our team is always ready to help you with anything.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                ),
              },
              {
                title: "Best Prices",
                desc: "Competitive pricing with regular exclusive deals.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition text-center"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Stay in the Loop</h2>
          <p className="text-gray-500 mb-8">
            Subscribe to get exclusive offers, new arrivals, and style inspiration delivered to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-indigo-700 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}