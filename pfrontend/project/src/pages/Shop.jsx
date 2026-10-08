import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList";

export default function Shop({ onAddToCart, onToggleWishlist, wishlist }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [colorFilter, setColorFilter] = useState("");
  const [searchParams] = useSearchParams();

  // Read category + color from URL
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const colorFromUrl = searchParams.get("color");

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("All");
    }

    if (colorFromUrl) {
      setColorFilter(colorFromUrl.toLowerCase());
    } else {
      setColorFilter("");
    }
  }, [searchParams]);

  // Fetch products + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const catRes = await fetch("http://localhost:3000/categories");
        const catData = await catRes.json();
        setCategories(catData.categories || []);

        const res = await fetch("http://localhost:3000/product");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products
  const filteredProducts = products.filter((item) => {
    const title = (item.title || "").toLowerCase();
    const description = (item.description || "").toLowerCase();
    const itemCategory = item.category?.title || item.category;

    const matchesSearch =
      title.includes(searchTerm.toLowerCase()) ||
      description.includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || itemCategory === selectedCategory;

    const matchesColor =
      !colorFilter ||
      title.includes(colorFilter) ||
      description.includes(colorFilter);

    return matchesSearch && matchesCategory && matchesColor;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-red-900">
      <h1 className="text-3xl font-bold mb-2">All Products</h1>
      

      {/* Category buttons */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === "All"
              ? "bg-indigo-600 text-red-900"
              : "bg-white border text-red-900"
          }`}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat._id}
            onClick={() => setSelectedCategory(cat.title)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === cat.title
                ? "bg-indigo-600 text-red-900"
                : "bg-white border text-red-900"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-8 max-w-xl">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border"
        />
      </div>

      {/* Products */}
      {loading ? (
        <div className="text-center py-20 text-red-900">Loading...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-red-900">
          No products in this category
        </div>
      ) : (
        <ProductList
          products={filteredProducts}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          wishlist={wishlist}
        />
      )}
    </div>
  );
}