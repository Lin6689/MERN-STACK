import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleAddToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [size, setSize] = useState("M");

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

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(() => setReviews([]));
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
  const discount = product.discount || 0;
  const finalPrice = Math.round(price * (1 - discount / 100));
  const description = product.description || "No description available.";
  const image =
    product.images?.[0]?.url ||
    product.image ||
    "https://via.placeholder.com/800";
  const productId = product._id || product.id;

  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const handleBuyNow = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    navigate(`/buy/${productId}`, { state: { size, finalPrice } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 md:py-16 -mt-12">
      <Link to="/shop" className="text-sm text-gray-500 hover:text-gray-800">
        ← Back to Shop
      </Link>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* LEFT - Image */}
        <div className="relative rounded-3xl overflow-hidden bg-gray-100 shadow-sm">
          <img
            src={image}
            alt={name}
            className="w-full h-[420px] md:h-[560px] object-cover"
          />
          {discount > 0 && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded">
              -{discount}% OFF
            </span>
          )}
        </div>

        {/* RIGHT - Details */}
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
            {name}
          </h1>

          {avgRating && (
            <p className="text-yellow-500 font-medium mb-3">
              ⭐ {avgRating} ({reviews.length} reviews)
            </p>
          )}

          {/* Amazon-style price */}
          <div className="mb-6">
            {discount > 0 && (
              <span className="inline-block bg-red-600 text-white text-sm font-bold px-2.5 py-1 rounded mb-2">
                -{discount}% OFF
              </span>
            )}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">₹{finalPrice}</span>
              {discount > 0 && (
                <>
                  <span className="text-xl text-gray-400 line-through">₹{price}</span>
                  <span className="text-green-700 font-medium text-sm">
                    Save ₹{price - finalPrice}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-xl">
            {description}
          </p>

          {/* Size */}
          <p className="text-sm font-medium text-gray-700 mb-2">Select Size</p>
          <div className="flex gap-2 mb-8">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`w-9 h-9 border rounded ${
                  size === s
                    ? "bg-red-900 text-white border-red-900"
                    : "bg-white text-gray-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handleAddToCart(product)}
              className="px-8 py-3.5 rounded-full bg-red-900 text-white font-medium hover:bg-stone-800 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="px-8 py-3.5 rounded-full border border-red-900 text-red-900 font-medium hover:bg-red-50 transition"
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

      {/* REVIEWS */}
      <div className="mt-12 pt-10 border-t">
        <h2 className="text-2xl font-bold mb-6 text-red-900">Customer Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          reviews.map((r) => (
            <div key={r._id} className="border-b py-4">
              <p className="font-medium">{r.userName || "User"}</p>
              <p className="text-yellow-500">{"⭐".repeat(r.rating || 0)}</p>
              <p className="text-gray-600 mt-1">{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}