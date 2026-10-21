import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

export default function Navbar() {
  const { cartCount, wishlistCount } = useCart();
  const [open, setOpen] = useState(false);
  const [userImage, setUserImage] = useState("");
  const [userName, setUserName] = useState("User");
  const location = useLocation();

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:3000/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserImage(res.data.image || "");
        setUserName(res.data.name || "User");
        localStorage.setItem("userImage", res.data.image || "");
        localStorage.setItem("userName", res.data.name || "");
      })
      .catch(() => {});
  }, [token, location.pathname]);

 const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("userId");
  localStorage.removeItem("userImage");
  localStorage.removeItem("userName");
  window.location.href = "/login";
};

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-red-900">
          Shop
        </Link>

        <div className="flex items-center gap-6 text-red-900">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/colors">Colors</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Wishlist */}
          <Link to="/wishlist" className="relative text-red-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative text-red-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Account */}
          {token ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 bg-gray-100"
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt="account"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="w-full h-full flex items-center justify-center text-red-900 text-sm font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                )}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 border-b"
                  >
                    {userImage ? (
                      <img
                        src={userImage}
                        alt="profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-red-900 text-white flex items-center justify-center font-bold">
                        {userName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-red-900">{userName}</p>
                      <p className="text-xs text-gray-500">View profile</p>
                    </div>
                  </Link>

                  {role === "admin" && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-red-900 hover:bg-gray-50"
                    >
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center text-red-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-xl shadow-lg py-2 z-50">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-red-900 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-red-900 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}