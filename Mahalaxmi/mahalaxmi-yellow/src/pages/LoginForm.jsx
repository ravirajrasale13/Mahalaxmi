import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // ⚡ Fake authentication (replace with API call if needed)
    const loggedInUser = {
      name: email.split("@")[0], // take part before @ as name
      email: email,
    };

    // ✅ Save user to localStorage
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    // 🔥 Trigger update so Navbar shows instantly
    window.dispatchEvent(new Event("userUpdated"));

    console.log("User logged in:", loggedInUser);

    // Redirect to homepage
    navigate("/");
  };

  return (
    <div className="page-container">
      {/* Login Section */}
      <main className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>

          <p className="form-link">
            Don’t have an account? <a href="/register">Register</a>
          </p>
        </form>
      </main>
    </div>
  );
};

export default LoginForm;
