import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setMessage("Email and password are required");
      return;
    }

    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
     localStorage.setItem("userId", res.data.userId || "");
      localStorage.setItem("userName", res.data.name || "User");
      localStorage.setItem("userImage", res.data.image || "");

      if (res.data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-red-900">Login</h1>

      <input
        className="border w-full p-2 mb-2 rounded"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="relative mb-2">
        <input
          className="border w-full p-2 pr-10 rounded"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? "🙈" : "👁"}
        </button>
      </div>

      <button
        className="bg-red-900 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>

      <p className="mt-3 text-red-600">{message}</p>

      <p className="mt-4 text-sm text-gray-600">
        Haven’t registered yet?{" "}
        <Link to="/register" className="text-red-900 font-medium hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}