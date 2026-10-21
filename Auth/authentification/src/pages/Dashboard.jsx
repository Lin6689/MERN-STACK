import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard({ role }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (role === "admin") {
      API.get("/admin/dashboard")
        .then(res => setMessage(res.data.message))
        .catch(err => setMessage(err.response.data.message));
    } else {
      setMessage("Welcome User Dashboard");
    }
  }, [role]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <div>
      <h1>{message}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}