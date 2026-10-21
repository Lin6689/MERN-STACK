import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios.get("http://localhost:3000/users/me", { headers }).then((res) => {
      setUser(res.data);
      setName(res.data.name || "");
      setPhone(res.data.phone || "");
      setAddress(res.data.address || "");
      setCity(res.data.city || "");
      setPincode(res.data.pincode || "");
    });

    axios.get("http://localhost:3000/orders/my", { headers }).then((res) => {
      setOrders(res.data || []);
    });
  }, []);

  const save = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("city", city);
    formData.append("pincode", pincode);
    if (image) formData.append("image", image);

 const res = await axios.put("http://localhost:3000/users/me", formData, {
  headers: { Authorization: `Bearer ${token}` },
});

setUser(res.data);
localStorage.setItem("userName", res.data.name || "");
localStorage.setItem("userImage", res.data.image || "");  // ← add
setMsg("Saved!");
  };

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <div className="flex items-center gap-4 mb-8">
        <img
          src={user.image || "https://via.placeholder.com/80"}
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border"
        />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <textarea
        className="border p-2 rounded w-full mb-3"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={2}
      />
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        className="border p-2 rounded w-full mb-3"
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

      <button
        onClick={save}
        className="bg-red-900 text-white px-6 py-2 rounded mb-2"
      >
        Save Profile
      </button>
      {msg && <p className="text-green-600 text-sm mb-8">{msg}</p>}

      <h2 className="text-2xl font-bold mt-10 mb-4">Previous Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet</p>
      ) : (
        orders.map((o) => (
          <div key={o._id} className="border rounded-lg p-4 mb-3">
            <p className="font-medium">{o.product?.title || "Product"}</p>
            <p className="text-sm text-gray-500">
              Size: {o.size} · {o.payment} · ₹{o.price}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(o.createdAt).toLocaleDateString()}
            </p>
            
          </div>
        ))
      )}
    </div>
  );
}