import { useState, useEffect } from "react";
import ProductList from "../components/ProductList";

export default function Shop({ onAddToCart, onToggleWishlist, wishlist }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1) Fetch categories directly
        const catRes = await fetch("http://localhost:3000/categories");
        const catData = await catRes.json();
        const catList = catData.categories || catData.data || [];
        setCategories(catList);

        // 2) Fetch products
        const res = await fetch("http://localhost:3000/product");
        const data = await res.json();
        const list = data.products || [];
        setProducts(list);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((item) => {
    const title = item.title || "";
    const description = item.description || "";

    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      description.toLowerCase().includes(searchTerm.toLowerCase());

    const itemCategory = item.category?.title || item.category;
    const matchesCategory =
      selectedCategory === "All" || itemCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">All Products</h1>
      <p className="text-gray-500 mb-8">
        Showing {filteredProducts.length} products
      </p>

      {/* ===== CATEGORY TOP BAR (direct from /categories) ===== */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedCategory === "All"
              ? "bg-indigo-600 text-white"
              : "bg-white border text-gray-700"
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
                ? "bg-indigo-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-8 relative max-w-xl">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-4 py-3 rounded-xl border"
        />
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading...</div>
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