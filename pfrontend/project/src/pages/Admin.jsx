import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [tab, setTab] = useState("product");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // product form
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [ratingMap, setRatingMap] = useState({});
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState(10);

  // category form
  const [catTitle, setCatTitle] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

 

const load = async () => {
  const p = await axios.get("http://localhost:3000/product");
  const c = await axios.get("http://localhost:3000/categories");
  setProducts(p.data.products || p.data);
  setCategories(c.data.categories || c.data);

  // ratings
  try {
    const r = await axios.get("http://localhost:3000/reviews");
    const list = Array.isArray(r.data) ? r.data : [];
    const map = {};

    list.forEach((rev) => {
      const pid = rev.product?.toString?.() || rev.product;
      if (!map[pid]) map[pid] = [];
      map[pid].push(rev.rating);
    });

    const avg = {};
    Object.keys(map).forEach((id) => {
      const sum = map[id].reduce((a, b) => a + b, 0);
      avg[id] = (sum / map[id].length).toFixed(1);
    });

    setRatingMap(avg);
  } catch {
    setRatingMap({});
  }
};
  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      window.location.href = "/login";
      return;
    }
    load();
  }, []);

  // block browser back on admin
// Block browser back button completely
  useEffect(() => {
    // Ek dummy state push karein
    window.history.pushState(null, "", window.location.href);

    const blockBack = () => {
      // Jaise hi user back dabaye, turant forward bhej dein
      window.history.forward();
    };

    window.addEventListener("popstate", blockBack);

    return () => {
      window.removeEventListener("popstate", blockBack);
    };
  }, []);
  // ===== CATEGORY =====
  const saveCategory = async () => {
    if (editCategoryId) {
      await axios.put(
        `http://localhost:3000/categories/${editCategoryId}`,
        { title: catTitle },
        { headers }
      );
    } else {
      await axios.post(
        "http://localhost:3000/categories",
        { title: catTitle },
        { headers }
      );
    }
    setCatTitle("");
    setEditCategoryId(null);
    load();
  };

  const startEditCategory = (c) => {
    setEditCategoryId(c._id);
    setCatTitle(c.title);
  };

  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:3000/categories/${id}`, { headers });
    load();
  };

  // ===== PRODUCT =====
  const saveProduct = async () => {
    if (editProductId) {
      await axios.put(
        `http://localhost:3000/product/${editProductId}`,
        {
          title,
          price: Number(price),
          description,
          category: category || undefined,
          discount: Number(discount) || 0,
          stock: Number(stock) || 0,
        },
        { headers }
      );
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("discount", discount || 0);
      formData.append("description", description);
      if (category) formData.append("category", category);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:3000/product", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setTitle("");
    setPrice("");
    setDiscount("");
    setDescription("");
    setCategory("");
    setImage(null);
    setEditProductId(null);
    load();
  };

  const startEditProduct = (p) => {
    setEditProductId(p._id);
    setTitle(p.title || "");
    setPrice(p.price || "");
    setDiscount(p.discount || "");
    setDescription(p.description || "");
    setCategory(p.category?._id || p.category || "");
    setStock(p.stock ?? 10);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/product/${id}`, { headers });
    load();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    window.location.replace("/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDEBAR */}
      <div className="w-56 bg-neutral-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <button
          onClick={() => setTab("product")}
          className="block w-full text-left mb-2 px-3 py-2 rounded hover:bg-neutral-800"
        >
          Product
        </button>

        <button
          onClick={() => setTab("category")}
          className="block w-full text-left px-3 py-2 rounded hover:bg-neutral-800"
        >
          Category
        </button>

        <button
          onClick={logout}
          className="block w-full text-left mt-6 px-3 py-2 rounded text-red-400 hover:bg-neutral-800"
        >
          Logout
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 p-6">
       {tab === "category" ? (
  <div>
    <h1 className="text-2xl font-bold mb-4">
      {editCategoryId ? "Edit Category" : "Create Category"}
    </h1>

    <div className="flex gap-2 mb-6">
      <input
        className="border p-2 rounded flex-1"
        value={catTitle}
        onChange={(e) => setCatTitle(e.target.value)}
        placeholder="Category name"
      />
      <button
        onClick={saveCategory}
        className="bg-indigo-600 text-white px-4 rounded"
      >
        {editCategoryId ? "Update" : "Add"}
      </button>
    </div>

    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-3 border">Title</th>
          <th className="p-3 border">Edit</th>
          <th className="p-3 border">Delete</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((c) => (
          <tr key={c._id} className="border-b">
            <td className="p-3 border">{c.title}</td>
            <td className="p-3 border">
              <button
                className="text-blue-600 font-medium"
                onClick={() => startEditCategory(c)}
              >
                Edit
              </button>
            </td>
            <td className="p-3 border">
              <button
                className="text-red-600 font-medium"
                onClick={() => deleteCategory(c._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
) : (
  // product section same as before
          <div>
            <h1 className="text-2xl font-bold mb-4">
              {editProductId ? "Edit Product" : "Create Product"}
            </h1>

            <input
              className="border p-2 rounded w-full mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="border p-2 rounded w-full mb-2"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
  className="border p-2 rounded w-full mb-2"
  placeholder="Discount %"
  value={discount}
  onChange={(e) => setDiscount(e.target.value)}
/>
<input
  className="border p-2 rounded w-full mb-2"
  placeholder="Stock"
  value={stock}
  onChange={(e) => setStock(e.target.value)}
/>
            <input
              className="border p-2 rounded w-full mb-2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className="border p-2 rounded w-full mb-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.title}
                </option>
              ))}
            </select>

            {!editProductId && (
              <input
                type="file"
                className="mb-3"
                onChange={(e) => setImage(e.target.files[0])}
              />
            )}

            <button
              onClick={saveProduct}
              className="bg-indigo-600 text-white px-4 py-2 rounded mb-6"
            >
              {editProductId ? "Update Product" : "Add Product"}
            </button>

           <table className="w-full border-collapse">
  <thead>
    <tr className="bg-gray-100 text-left">
      <th className="p-3 border">Title</th>
      <th className="p-3 border">Price</th>
      <th className="p-3 border">Discount</th>
      <th className="p-3 border">Stock</th>
      <th className="p-3 border">Rating</th>
      <th className="p-3 border">Edit</th>
      <th className="p-3 border">Delete</th>
    </tr>
  </thead>
  <tbody>
    {products.map((p) => (
      <tr key={p._id} className="border-b">
        <td className="p-3 border">{p.title}</td>
        <td className="p-3 border">₹{p.price}</td>
        <td className="p-3 border">{p.discount ? `${p.discount}%` : "—"}</td>
        <td className="p-3 border">{p.stock ?? 0}</td>
        <td className="p-3 border">
          {ratingMap[p._id] ? `⭐ ${ratingMap[p._id]}` : "—"}
        </td>
        <td className="p-3 border">
          <button
            className="text-blue-600 font-medium"
            onClick={() => startEditProduct(p)}
          >
            Edit
          </button>
        </td>
        <td className="p-3 border">
          <button
            className="text-red-600 font-medium"
            onClick={() => deleteProduct(p._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
          </div>
        )}
      </div>
    </div>
  );
}