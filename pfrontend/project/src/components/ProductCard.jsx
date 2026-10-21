import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  rating,
}) {
  const [size, setSize] = useState("M");

  const name = product.title || product.name || "Product";
  const price = product.price || 0;
  const discount = product.discount || 0;
  const finalPrice = Math.round(price * (1 - discount / 100));
  const stock = product.stock ?? 0;
  const image =
    product.images?.[0]?.url ||
    product.image ||
    "https://via.placeholder.com/400";
  const category = product.category?.title || product.category || "General";
  const id = product._id || product.id;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full">
      {/* Image */}
      <div className="relative bg-gray-50 aspect-square overflow-hidden">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </Link>

        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          onClick={() => onToggleWishlist(product)}
          className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-50 transition"
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

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {category}
        </p>

        <Link to={`/product/${id}`}>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[40px] hover:text-red-900 transition mb-2">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2 min-h-[20px]">
          {rating ? (
            <>
              <span className="text-amber-500 text-sm">★</span>
              <span className="text-sm font-medium text-gray-800">{rating}</span>
            </>
          ) : (
            <span className="text-xs text-gray-400">No ratings</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-gray-900">₹{finalPrice}</span>
          {discount > 0 && (
            <span className="text-sm text-gray-400 line-through">₹{price}</span>
          )}
        </div>

        {/* Stock */}
        <p
          className={`text-xs mb-3 ${
            stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </p>

        {/* Size */}
        <div className="flex gap-2 mb-4">
          {["S", "M", "L", "XL"].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`w-8 h-8 rounded-md border text-xs font-medium transition ${
                size === s
                  ? "bg-red-900 text-white border-red-900"
                  : "bg-white text-gray-700 border-gray-300 hover:border-red-900"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={() => onAddToCart({ ...product, size })}
          disabled={stock < 1}
          className={`mt-auto w-full py-2.5 rounded-lg text-sm font-medium transition ${
            stock < 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-red-900 text-white hover:bg-red-800"
          }`}
        >
          {stock < 1 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}