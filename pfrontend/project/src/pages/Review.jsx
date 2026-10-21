import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Review() {
  const { id, productId } = useParams(); 
  const pId = productId || id; // Safety check if param name is :id or :productId
  
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = location.state?.orderId;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submit = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/reviews",
        {
          product: pId,
          rating: Number(rating),
          comment,
          userName: localStorage.getItem("userName") || "Customer",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (orderId) {
        // Yahan order-confirm wala route hona chahiye
        navigate(`/order-confirm/${orderId}`);
      } else {
        navigate("/shop");
      }
    } catch (error) {
      console.error("Review submit error:", error);
      // Agar error bhi aaye toh order ID ho toh confirm page par bhej dein
      if (orderId) {
        navigate(`/order-confirm/${orderId}`);
      } else {
        navigate("/shop");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Rate Product</h1>

      <select
        className="border p-2 w-full mb-4"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="5">5 ⭐</option>
        <option value="4">4 ⭐</option>
        <option value="3">3 ⭐</option>
        <option value="2">2 ⭐</option>
        <option value="1">1 ⭐</option>
      </select>

      <textarea
        className="border p-2 w-full mb-4"
        placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-red-900 text-white py-3 rounded"
      >
        Submit
      </button>
    </div>
  );
}