import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { useCart } from "../context/CartContext";

export default function Shop() {
  const { handleAddToCart, handleToggleWishlist, wishlist } = useCart();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [colorFilter, setColorFilter] = useState("");
  const [ratingMap, setRatingMap] = useState({});
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  
  // ✅ 1. Add state for sorting
  const [sortOption, setSortOption] = useState(""); 
  const perPage = 8;

  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // URL filters
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    const colorFromUrl = searchParams.get("color");

    setSelectedCategory(categoryFromUrl || "All");
    setColorFilter(colorFromUrl ? colorFromUrl.toLowerCase() : "");
  }, [searchParams]);

  // products + categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const catRes = await fetch("http://localhost:3000/categories");
        const catData = await catRes.json();
        setCategories(catData.categories || catData || []);

        const res = await fetch("http://localhost:3000/product");
        const data = await res.json();
        setProducts(data.products || data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ratings
  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [];
        const map = {};

        list.forEach((r) => {
          const pid = r.product?.toString?.() || r.product;
          if (!map[pid]) map[pid] = [];
          map[pid].push(r.rating);
        });

        const avg = {};
        Object.keys(map).forEach((id) => {
          const sum = map[id].reduce((a, b) => a + b, 0);
          avg[id] = (sum / map[id].length).toFixed(1);
        });

        setRatingMap(avg);
      })
      .catch(() => setRatingMap({}));
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

  // ✅ 2. Sort the filtered products based on sortOption
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low-to-high") {
      return (a.price || 0) - (b.price || 0);
    } else if (sortOption === "price-high-to-low") {
      return (b.price || 0) - (a.price || 0);
    }
    return 0; // Default / no sorting
  });

  // Pagination logic using sorted products
  const totalPages = Math.ceil(sortedProducts.length / perPage) || 1;
  const start = (page - 1) * perPage;
  const pageProducts = sortedProducts.slice(start, start + perPage);

  // Reset to page 1 whenever filters or sorting change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory, colorFilter, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-red-900">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>

      {/* Search and Flipkart-style Sort bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="w-full max-w-xl">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border"
          />
        </div>

        {/* ✅ 3. Sort Dropdown UI */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort By:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-3 py-2 rounded-xl border text-sm bg-white focus:outline-none"
          >
            <option value="">Default</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Category horizontal scroller */}
      <div className="relative flex items-center mb-8">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 bg-white border rounded-full w-8 h-8 shadow flex items-center justify-center"
        >
          ‹
        </button>

        <div
          ref={scrollRef}
          className="flex gap-2 overflow-x-auto mx-10 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          <button
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border ${
              selectedCategory === "All"
                ? "bg-red-900 text-white"
                : "bg-white text-red-900"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setSelectedCategory(cat.title)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border ${
                selectedCategory === cat.title
                  ? "bg-red-900 text-white"
                  : "bg-white text-red-900"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 bg-white border rounded-full w-8 h-8 shadow flex items-center justify-center"
        >
          ›
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-red-900">Loading...</div>
      ) : pageProducts.length === 0 ? (
        <div className="text-center py-20 text-red-900">
          No products in this category
        </div>
      ) : (
        <ProductList
          products={pageProducts}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlist={wishlist}
          ratingMap={ratingMap}
        />
      )}

      {/* Compact Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-8 text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-2.5 py-1 border rounded text-xs font-medium disabled:opacity-40 hover:bg-gray-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`min-w-[32px] h-8 px-2 py-1 rounded text-xs font-medium border ${
                page === n
                  ? "bg-red-900 text-white border-red-900"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-2.5 py-1 border rounded text-xs font-medium disabled:opacity-40 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}