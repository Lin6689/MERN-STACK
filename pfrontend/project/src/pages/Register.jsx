import { useState } from "react";
import {Link} from "react-router-dom";
import API from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
  // password rules
  if (password.length < 6) {
    setMessage("Password must be at least 6 characters");
    return;
  }
  if (!/[A-Z]/.test(password)) {
    setMessage("Password must have 1 uppercase letter");
    return;
  }
  if (!/[0-9]/.test(password)) {
    setMessage("Password must have 1 number");
    return;
  }
   if (!/[!/[!@#$%^&*]/.test(password)) {
    setMessage("Password must have 1 special character");
    return;
  }
  

  try {
    await API.post("/auth/register", { name, email, password, role });
    window.location.href = "/login";
  } catch (err) {
    setMessage(err.response?.data?.message || "Register failed");
  }
};

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-red-900">Register</h1>
      <input className="border w-full p-2 mb-2" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input className="border w-full p-2 mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <div className="relative mb-2">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="border w-full p-2 pr-10 rounded"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
  >
    {showPassword ? "🙈" : "👁"}
  </button>
</div>

<p className="text-xs text-gray-500 mb-2">
  Min 6 chars, 1 uppercase, 1 number, 1 special (!@#$%^&*)
</p>
      <p className="text-xs text-gray-500 mb-2 text-red-900">
  Password must be 6+ chars, with 1 uppercase and 1 number
</p>
      <select className="border w-full p-2 mb-2" onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button className="bg-red-900 text-white px-4 py-2 rounded" onClick={handleRegister}>
        Register
      </button>
      <p className="mt-4 text-sm text-gray-600">
  Already have an account?{" "}
  <Link to="/login" className="text-red-900 font-medium hover:underline">
    Login here
  </Link>
</p>
      <p className="mt-3">{message}</p>
    </div>
  );
}