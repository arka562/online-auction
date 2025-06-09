import React from "react";
import "./AccessDenied.css";

const AccessDenied = () => {
  return (
    <div className="access-denied-container">
      <h2 className="access-denied-title">Access Denied</h2>
      <p className="access-denied-message">
        You are not authorized to access this page.
      </p>
    </div>
  );
};

export default AccessDenied;
