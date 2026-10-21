import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function Buy() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, handleRemoveFromCart } = useCart();

  const fromCart = location.state?.fromCart === true;

  const [product, setProduct] = useState(null);
  const [payment, setPayment] = useState("COD");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [size, setSize] = useState(location.state?.size || "M");

  useEffect(() => {
    if (fromCart) return;
    fetch(`http://localhost:3000/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data || data));
  }, [id, fromCart]);

  const items = fromCart
    ? cart
    : product
    ? [{ ...product, size, quantity: 1 }]
    : [];

  const placeOrder = async () => {
    if (!phone || phone.length !== 10) {
      alert("Enter valid 10 digit phone number");
      return;
    }

    if (!address.trim()) {
      alert("Enter address");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (items.length === 0) {
      alert("No items to order");
      return;
    }

    try {
      let lastOrderId = null;
      let lastProductId = null;

      for (const item of items) {
        const productId = item._id || item.id;
        const price = item.price || 0;
        const discount = item.discount || 0;
        const unit = Math.round(price * (1 - discount / 100));
        const qty = item.quantity || 1;
        const itemSize = item.size || size || "M";

        const res = await axios.post(
          "http://localhost:3000/orders",
          {
            product: productId,
            size: itemSize,
            quantity: qty,
            price: unit * qty,
            payment,
            phone,
            address,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        lastOrderId = res.data._id || res.data.order?._id;
        lastProductId = productId;
        handleRemoveFromCart(productId, itemSize);
      }

      navigate(`/review/${lastProductId}`, {
        state: { orderId: lastOrderId },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  if (!fromCart && !product) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (fromCart && cart.length === 0) {
    return <div className="p-10 text-center text-gray-500">Cart is empty</div>;
  }

  const total = items.reduce((sum, item) => {
    const price = item.price || 0;
    const discount = item.discount || 0;
    const unit = Math.round(price * (1 - discount / 100));
    return sum + unit * (item.quantity || 1);
  }, 0);

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {items.map((item) => {
        const price = item.price || 0;
        const discount = item.discount || 0;
        const unit = Math.round(price * (1 - discount / 100));
        const qty = item.quantity || 1;
        return (
          <div
            key={`${item._id || item.id}-${item.size}`}
            className="border-b py-3 mb-2"
          >
            <p className="font-medium">{item.title}</p>
            <p className="text-red-900 font-bold">₹{unit * qty}</p>
            <p className="text-sm text-gray-500">
              Size: {item.size || size} × {qty}
            </p>
          </div>
        );
      })}

      <p className="text-lg font-bold mb-6">Total: ₹{total}</p>

      <label className="block text-sm mb-1">Phone</label>
      <input
        className="border p-2 rounded w-full mb-4"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
        }
        placeholder="10 digit phone"
        maxLength={10}
      />

      <label className="block text-sm mb-1">Address</label>
      <textarea
        className="border p-2 rounded w-full mb-4"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Full address"
        rows={3}
      />

      <label className="block text-sm mb-1">Payment</label>
      <select
        className="border p-2 rounded w-full mb-6"
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
      >
        <option value="COD">Cash on Delivery</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
      </select>

      <button
        onClick={placeOrder}
        className="w-full bg-red-900 text-white py-3 rounded-lg font-medium"
      >
        Place Order
      </button>
    </div>
  );
}