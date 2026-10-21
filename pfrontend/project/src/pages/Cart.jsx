import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    handleUpdateQuantity,
    handleRemoveFromCart,
  } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    const price = item.price || 0;
    const discount = item.discount || 0;
    const unit = Math.round(price * (1 - discount / 100));
    return sum + unit * (item.quantity || 1);
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Link to="/shop" className="text-red-900 font-medium">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-8">Cart ({cart.length})</h1>

      {cart.map((item) => {
        const id = item._id || item.id;
        const size = item.size || "M";
        const price = item.price || 0;
        const discount = item.discount || 0;
        const unit = Math.round(price * (1 - discount / 100));
        const qty = item.quantity || 1;
        const image =
          item.images?.[0]?.url || item.image || "https://via.placeholder.com/100";

        return (
          <div
            key={`${id}-${size}`}
            className="flex gap-4 border-b py-4 items-center"
          >
            <img
              src={image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-500">Size: {size}</p>
              <p className="text-red-900 font-bold">₹{unit * qty}</p>

              <div className="flex items-center gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => handleUpdateQuantity(id, size, qty - 1)}
                  className="w-8 h-8 border rounded"
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  onClick={() => handleUpdateQuantity(id, size, qty + 1)}
                  className="w-8 h-8 border rounded"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveFromCart(id, size)}
                  className="text-red-600 text-sm ml-4"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ₹{total}</p>
        <button
          type="button"
          onClick={() => {
            const first = cart[0];
            if (!first) return;
            navigate(`/buy/${first._id || first.id}`, {
              state: { fromCart: true },
            });
          }}
          className="bg-red-900 text-white px-8 py-3 rounded-lg font-medium"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}