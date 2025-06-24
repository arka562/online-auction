import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

const Nav = ({ header }) => {
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const isLoggedIn = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("seller_id");
    localStorage.removeItem("buyer_id");
    localStorage.removeItem("admin_id");
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <nav className="nav-bar">
      <div className="nav-container">
        <div className="nav-header">
          <h2 className="nav-title">{header}</h2>

          {/* Logout button on the right */}
          {isLoggedIn && (
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        {/* Centered role-based options */}
        <div className="nav-options-center">
          {userType === "seller" && (
            <div className="btn-group">
              <button
                className="btn btn-blue"
                onClick={() => navigate("/seller")}
              >
                Seller Dashboard
              </button>
              <button
                className="btn btn-blue"
                onClick={() => navigate("/seller/add-product")}
              >
                Add Product
              </button>
              <button
                className="btn btn-blue"
                onClick={() => navigate("/seller/products")}
              >
                View Products
              </button>
            </div>
          )}

          {userType === "buyer" && (
            <div className="btn-group">
              <button
                className="btn btn-blue"
                onClick={() => navigate("/products")}
              >
                View Products
              </button>
              <button
                className="btn btn-blue"
                onClick={() => navigate("/userprofile")}
              >
                User Profile
              </button>
            </div>
          )}

          {userType === "admin" && (
            <div className="btn-group">
              <button
                className="btn btn-blue"
                onClick={() => navigate("/admin")}
              >
                Admin Dashboard
              </button>
              <button
                className="btn btn-blue"
                onClick={() => navigate("/admin/auctions")}
              >
                Auctions History
              </button>
              <button
                className="btn btn-blue"
                onClick={() => navigate("/admin/transactions")}
              >
                Transaction History
              </button>
              <button
                className="btn btn-blue"
                onClick={() => navigate("/admin/bids")}
              >
                Bids Placed
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
