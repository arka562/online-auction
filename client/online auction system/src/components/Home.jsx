import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    navigate("/products");
  };

  return (
    <div className="home-container">
      <form className="home-form" onSubmit={handleSubmit}>
        <label htmlFor="username" className="form-label">
          Enter your username
        </label>
        <input
          type="text"
          name="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
          minLength={6}
          className="form-input"
        />
        <button className="form-button">SIGN IN</button>
      </form>
    </div>
  );
};

export default Home;
