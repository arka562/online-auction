import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("buyer_id");

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/buyers/${userId}`
        );
        setProfile(response.data);
      } catch (error) {
        setError("Error fetching profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    } else {
      setError("Buyer ID not found in local storage.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="profile-message">Loading...</div>;
  }

  if (error) {
    return <div className="profile-message">{error}</div>;
  }

  let formattedAccountBalance = "";
  const accountBalance = Number(profile.account_balance);
  if (!isNaN(accountBalance)) {
    formattedAccountBalance = accountBalance
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    formattedAccountBalance = "N/A";
  }

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
      <div className="profile-info">
        <p>
          <strong>Username:</strong> {profile.username}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Address:</strong> {profile.address}
        </p>
        <p>
          <strong>Account Balance:</strong> ₹{formattedAccountBalance}
        </p>
      </div>
    </div>
  );
};

export default Profile;
