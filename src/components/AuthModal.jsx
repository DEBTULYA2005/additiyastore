import { useState } from "react";
import { loginUser, registerUser } from "../api";  // 👈 import API

export default function AuthModal({ onAuth, onClose }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async () => {   // 👈 async
    setError("");

    // ===== LOGIN =====
    if (mode === "login") {
      const { email, password } = loginData;

      if (!email || !password) return setError("Please fill all fields");

      const data = await loginUser(email, password);  // 👈 calls Django

      if (data.token) {
        localStorage.setItem("token", data.token);
        onAuth(data.user, data.token);
      } else {
        setError("Invalid email or password");
      }
    }

    // ===== SIGNUP =====
    if (mode === "signup") {
      const { username, email, password, confirmPassword } = signupData;

      if (!username || !email || !password || !confirmPassword)
        return setError("Please fill all fields");

      if (password !== confirmPassword)
        return setError("Passwords do not match");

      const data = await registerUser(username, email, password);  // 👈 calls Django

      if (data.token) {
        localStorage.setItem("token", data.token);
        onAuth(data.user, data.token);
      } else {
        setError(data.username?.[0] || data.email?.[0] || "Registration failed");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-modal">

        <span className="close-btn" onClick={onClose}>✖</span>

        <div className="auth-tabs">
          <button
            className={mode === "login" ? "active-tab" : ""}
            onClick={() => { setMode("login"); setError(""); setLoginData({ email: "", password: "" }); }}
          >Login</button>

          <button
            className={mode === "signup" ? "active-tab" : ""}
            onClick={() => { setMode("signup"); setError(""); setSignupData({ username: "", email: "", password: "", confirmPassword: "" }); }}
          >Signup</button>
        </div>

        <h2>{mode === "login" ? "Login" : "Create Account"}</h2>

        {/* USERNAME (SIGNUP ONLY) */}
        {mode === "signup" && (
          <input
            placeholder="Username"        // 👈 was "Name", now "Username"
            value={signupData.username}   // 👈 was signupData.name
            onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
          />
        )}

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={mode === "login" ? loginData.email : signupData.email}
          onChange={(e) =>
            mode === "login"
              ? setLoginData({ ...loginData, email: e.target.value })
              : setSignupData({ ...signupData, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <div className="password-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={mode === "login" ? loginData.password : signupData.password}
            onChange={(e) =>
              mode === "login"
                ? setLoginData({ ...loginData, password: e.target.value })
                : setSignupData({ ...signupData, password: e.target.value })
            }
          />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* CONFIRM PASSWORD (SIGNUP ONLY) */}
        {mode === "signup" && (
          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
            />
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? "🙈" : "👁️"}
            </span>
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleSubmit}>
          {mode === "login" ? "Login" : "Signup"}
        </button>

      </div>
    </div>
  );
}