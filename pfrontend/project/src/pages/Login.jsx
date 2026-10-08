import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      setMessage("Login successful");

      if (res.data.role === "admin") navigate("/admin");
      else navigate("/");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input className="border w-full p-2 mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border w-full p-2 mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Login
      </button>
      <p className="mt-3">{message}</p>
    </div>
  );
}