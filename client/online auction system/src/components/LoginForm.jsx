import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

const LoginForm = ({ setForceRefresh }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("buyer");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let loginSuccess = false;
      let responseData;

      if (userType === "admin") {
        if (username === "admin" && password === "vjti@123") {
          loginSuccess = true;
          responseData = { adminID: "admin" };
        }
      } else {
        const response = await axios.post("http://localhost:4000/api/login", {
          username,
          password,
          userType,
        });
        loginSuccess = response.data.auth;
        responseData = response.data;
      }

      if (loginSuccess) {
        localStorage.setItem("username", username);
        localStorage.setItem("userType", userType);
        if (userType === "buyer") {
          localStorage.removeItem("seller_id");
          localStorage.setItem("buyer_id", responseData.buyerID);
          setForceRefresh((prev) => !prev);
          navigate("/products");
        } else if (userType === "seller") {
          localStorage.removeItem("buyer_id");
          localStorage.setItem("seller_id", responseData.sellerID);
          setForceRefresh((prev) => !prev);
          navigate("/seller");
        } else if (userType === "admin") {
          localStorage.setItem("admin_id", responseData.adminID);
          setForceRefresh((prev) => !prev);
          navigate("/admin");
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to login. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Login</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
