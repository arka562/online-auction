import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ setForceRefresh }) => {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [userType, setUserType] = useState("buyer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        const response = await axios.post("http://localhost:4000/api/login", {
          username,
          password,
          userType,
        });

        const { token, user } = response.data;

        if (token && user) {
          localStorage.setItem("token", token);
          localStorage.setItem("username", user.username);
          localStorage.setItem("userType", user.userType);

          if (userType === "buyer") {
            localStorage.setItem("buyer_id", user.id);
            localStorage.removeItem("seller_id");
            navigate("/products");
          } else if (userType === "seller") {
            localStorage.setItem("seller_id", user.id);
            localStorage.removeItem("buyer_id");
            navigate("/seller");
          } else if (userType === "admin") {
            localStorage.setItem("admin_id", user.id);
            navigate("/admin");
          }

          setForceRefresh((prev) => !prev);
        } else {
          setError("Invalid credentials");
        }
      } else {
        // Registration
        const payload = {
          username,
          password,
          userType,
          ...(email && { email }),
          ...(address && { address }),
          ...(accountBalance && { accountBalance }),
        };

        const response = await axios.post(
          "http://localhost:4000/api/register",
          payload
        );
        if (response.status === 201) {
          alert("Registration successful! Please log in.");
          setMode("login");
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">
          {mode === "login" ? "Login" : "Register"}
        </h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {mode === "register" && (
            <>
              <input
                className="login-input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="login-input"
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                className="login-input"
                type="number"
                placeholder="Account Balance"
                value={accountBalance}
                onChange={(e) => setAccountBalance(e.target.value)}
              />
            </>
          )}
          <select
            className="login-input"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
          <button className="login-button" type="submit">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>
        <p className="toggle-text">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span className="toggle-link" onClick={() => setMode("register")}>
                Register
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span className="toggle-link" onClick={() => setMode("login")}>
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
