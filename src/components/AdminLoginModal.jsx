import { useState } from "react";
import { adminLogin } from "../api";

export default function AdminLoginModal({ onClose, onSuccess }) {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");

  const handleLogin = async () => {
    setError("");

    const data = await adminLogin(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      onSuccess(data.user, data.token);
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-modal">
        <span className="close-btn" onClick={onClose}>✖</span>

        <h2>Admin Login</h2>

        <input
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}