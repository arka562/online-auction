import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css"; // Import CSS

// Reusable ButtonLink component
const ButtonLink = ({ to, text }) => {
  return (
    <Link to={to} className="button-link">
      <button className="btn">{text}</button>
    </Link>
  );
};

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1 className="title">Admin Dashboard</h1>
      <div className="button-group">
        <ButtonLink to="/admin/auctions" text="Auctions History" />
        <ButtonLink to="/admin/transactions" text="Transaction History" />
        <ButtonLink to="/admin/bids" text="Bids Placed" />
      </div>
    </div>
  );
};

export default AdminDashboard;
