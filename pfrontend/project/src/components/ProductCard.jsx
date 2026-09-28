export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}) {
  const name = product.title || product.name || "Product";
  const price = product.price || 0;
  const image =
    product.images?.[0]?.url ||
    product.image ||
    "https://via.placeholder.com/400";
  const category = product.category?.title || product.category || "General";

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
        />

        <button
          onClick={() => onToggleWishlist(product)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 ${
              isInWishlist ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-500 mb-1 capitalize">{category}</p>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{name}</h3>

        <div className="flex items-center justify-between mt-3">
          <span className="text-indigo-600 font-bold text-xl">₹{price}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}