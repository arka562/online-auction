import React from "react";
import { Link } from "react-router-dom";
import "./SellerDashboard.css";

const SellerDashboard = () => {
  return (
    <div className="seller-dashboard-container">
      <h1 className="seller-dashboard-heading">Seller Admin Dashboard</h1>
      <div className="seller-dashboard-buttons">
        <Link to="/seller/products" className="seller-dashboard-link">
          <button className="seller-dashboard-button">View Products</button>
        </Link>
        <Link to="/seller/add-product" className="seller-dashboard-link">
          <button className="seller-dashboard-button">Add Product</button>
        </Link>
      </div>
    </div>
  );
};

export default SellerDashboard;
