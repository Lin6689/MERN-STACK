import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function OrderConfirm() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3000/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrder(res.data))
      .catch(() => setOrder(null));
  }, [id]);

  if (!order) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Confirmed ✅
      </h1>

      <p className="text-gray-600 mb-2">Order ID: {order._id}</p>
      <p className="mb-1">
        <b>{order.product?.title || "Product"}</b>
      </p>
      <p className="mb-1">Size: {order.size || "-"}</p>
      <p className="mb-1">Payment: {order.payment}</p>
      <p className="mb-1">Phone: {order.phone}</p>
      <p className="mb-6">Address: {order.address}</p>
      <p className="text-xl font-bold text-red-900 mb-8">₹{order.price}</p>

      <div className="flex gap-4 justify-center">
        <Link
          to="/shop"
          className="px-6 py-2 bg-red-900 text-white rounded-lg"
        >
          Continue Shopping
        </Link>
        <Link
          to="/profile"
          className="px-6 py-2 border border-red-900 text-red-900 rounded-lg"
        >
          My Orders
        </Link>
      </div>
    </div>
  );
}