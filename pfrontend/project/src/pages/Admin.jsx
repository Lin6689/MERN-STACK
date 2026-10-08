import { useEffect, useState } from "react";
import axios from "axios";

export default function Admin() {
  const [tab, setTab] = useState("product");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // product form
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [editProductId, setEditProductId] = useState(null);

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
  };

  useEffect(() => {
    if (localStorage.getItem("role") !== "admin") {
      window.location.href = "/login";
      return;
    }
    load();
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
      // edit without new image (simple)
      await axios.put(
        `http://localhost:3000/product/${editProductId}`,
        { title, price, description, category },
        { headers }
      );
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("category", category);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:3000/product", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    }

    setTitle("");
    setPrice("");
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
    setDescription(p.description || "");
    setCategory(p.category?._id || p.category || "");
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:3000/product/${id}`, { headers });
    load();
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT */}
      <div className="w-56 bg-neutral-900 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin</h2>
        <button
          onClick={() => setTab("product")}
          className={`block w-full text-left mb-2 px-3 py-2 rounded `}
        >
          Product
        </button>
        <button
          onClick={() => setTab("category")}
          className={`block w-full text-left px-3 py-2 rounded `}
        >
          Category
        </button>
      </div>

      {/* RIGHT */}
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
              <button onClick={saveCategory} className="bg-indigo-600 text-white px-4 rounded">
                {editCategoryId ? "Update" : "Add"}
              </button>
            </div>

            {categories.map((c) => (
              <div key={c._id} className="flex justify-between border-b py-2">
                <span>{c.title}</span>
                <div className="flex gap-3">
                  <button className="text-blue-600" onClick={() => startEditCategory(c)}>Edit</button>
                  <button className="text-red-600" onClick={() => deleteCategory(c._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold mb-4">
              {editProductId ? "Edit Product" : "Create Product"}
            </h1>

            <input className="border p-2 rounded w-full mb-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="border p-2 rounded w-full mb-2" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
            <input className="border p-2 rounded w-full mb-2" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

            <select className="border p-2 rounded w-full mb-2" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>{c.title}</option>
              ))}
            </select>

            {!editProductId && (
              <input type="file" className="mb-3" onChange={(e) => setImage(e.target.files[0])} />
            )}

            <button onClick={saveProduct} className="bg-indigo-600 text-white px-4 py-2 rounded mb-6">
              {editProductId ? "Update Product" : "Add Product"}
            </button>

            {products.map((p) => (
              <div key={p._id} className="flex justify-between border-b py-2">
                <span>{p.title} - ₹{p.price}</span>
                <div className="flex gap-3">
                  <button className="text-blue-600" onClick={() => startEditProduct(p)}>Edit</button>
                  <button className="text-red-600" onClick={() => deleteProduct(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}