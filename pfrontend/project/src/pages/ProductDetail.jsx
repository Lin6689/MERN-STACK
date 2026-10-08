import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function ProductDetail({ onAddToCart, onToggleWishlist, wishlist = [] }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3000/product/${id}`);
        const data = await res.json();
        setProduct(data.data || data.product || data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-24 text-gray-500">Loading...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-500 mb-4">Product not found</p>
        <Link to="/shop" className="text-indigo-600 font-medium">
          Back to Shop
        </Link>
      </div>
    );
  }

  const name = product.title || product.name || "Product";
  const price = product.price || 0;
  const description = product.description || "No description available.";
  const image =
    product.images?.[0]?.url ||
    product.image ||
    "https://via.placeholder.com/800";
  const category = product.category?.title || product.category || "General";
  const productId = product._id || product.id;
  const isInWishlist = wishlist.some(
    (item) => (item._id || item.id) === productId
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-16">
      <Link to="/shop" className="text-sm text-gray-500 hover:text-gray-800">
        ← Back to Shop
      </Link>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* LEFT - Big Image */}
        <div className="rounded-3xl overflow-hidden bg-gray-100 shadow-sm">
          <img
            src={image}
            alt={name}
            className="w-full h-[420px] md:h-[560px] object-cover"
          />
        </div>

        {/* RIGHT - Details */}
        <div className="flex flex-col justify-center">
          <p className="text-sm uppercase tracking-wider text-indigo-600 font-medium mb-3">
            
          </p>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            {name}
          </h1>

          <p className="text-3xl font-bold text-gray-900 mb-6">₹{price}</p>

          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
            {description}
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onAddToCart(product)}
              className="px-8 py-3.5 rounded-full bg-red-900 text-white font-medium hover:bg-stone-800 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => onToggleWishlist(product)}
              className={`px-8 py-3.5 rounded-full border font-medium transition ${
                isInWishlist
                  ? "border-red-500 text-red-500 bg-red-50"
                  : "border-gray-300 text-gray-700 hover:border-gray-500"
              }`}
            >
            Buy Now
            </button>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 space-y-2 text-sm text-gray-500">
            <p>✓ Free shipping on orders over ₹999</p>
            <p>✓ Easy 30-day returns</p>
            <p>✓ Secure checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}