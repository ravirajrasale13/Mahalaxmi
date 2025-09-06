import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationForm.css";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const newUser = {
      name,
      email,
      mobile,
    };

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
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

<input
  type="tel"                    // no spinner
  inputMode="numeric"           // mobile numeric keyboard
  pattern="\d*"                 // simple HTML hint (optional)
  placeholder="Enter your number"
  required
  value={mobile}
  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))} // keep digits only
  onWheel={(e) => e.currentTarget.blur()}       // stop wheel changing value
  onKeyDown={(e) => {                           // block arrow keys changing value
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') e.preventDefault();
  }}
/>


          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
