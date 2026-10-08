import { useState } from "react";
import API from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const res = await API.post("/auth/register", { name, email, password, role });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input className="border w-full p-2 mb-2" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input className="border w-full p-2 mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border w-full p-2 mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <select className="border w-full p-2 mb-2" onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={handleRegister}>
        Register
      </button>
      <p className="mt-3">{message}</p>
    </div>
  );
}