import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      {!role ? (
        showRegister ? (
          <>
            <Register />
            <p>
              Already have an account?{" "}
              <button onClick={() => setShowRegister(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login setRole={setRole} />
            <p>
              Don't have an account?{" "}
              <button onClick={() => setShowRegister(true)}>Register</button>
            </p>
          </>
        )
      ) : (
        <Dashboard role={role} />
      )}
    </div>
  );
}