import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationForm.css";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = { name, email, mobile };

    // ✅ Save user to localStorage
    localStorage.setItem("user", JSON.stringify(newUser));

    // 🔥 Trigger update so Navbar shows instantly
    window.dispatchEvent(new Event("userUpdated"));

    console.log("User registered:", newUser);

    // Redirect to homepage (or login page if you prefer)
    navigate("/");
  };

  return (
    <div className="page-container">
      {/* Register Section */}
      <main className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Register</h2>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              required
              minLength={2}
              pattern="^[A-Za-z\s]+$"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile</label>
            <input
              id="mobile"
              type="tel"
              inputMode="numeric"
              pattern="\d{10}"
              placeholder="Enter 10-digit number"
              required
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              onWheel={(e) => e.currentTarget.blur()}
              onKeyDown={(e) => {
                if (e.key === "ArrowUp" || e.key === "ArrowDown")
                  e.preventDefault();
              }}
            />
          </div>

          {/* Password */}
          <div className="form-group password-group">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password (min 6 chars)"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group password-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-wrapper">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          <button type="submit">Register</button>

          <p className="form-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </main>
    </div>
  );
};

export default RegistrationForm;
