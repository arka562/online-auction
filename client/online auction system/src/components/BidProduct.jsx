import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./BidProduct.css";

const BidProduct = () => {
  const { name, price } = useParams();
  const [amount, setAmount] = useState(price);
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedAmount = parseFloat(amount);
      if (parsedAmount <= parseFloat(price)) {
        setError(true);
        setErrorMessage(`The bidding amount must be greater than ${price}`);
        return;
      }

      const response = await axios.post("http://localhost:4000/api/bid", {
        itemName: name,
        amount: parsedAmount,
        last_bidder: localStorage.getItem("username"),
      });

      if (response.data.message === "Bid placed successfully") {
        setError(false);
        navigate("/products");
      } else {
        setError(true);
        setErrorMessage("Failed to place bid. Please try again.");
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      setError(true);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="bid-product-container">
      <div className="bid-form-wrapper">
        <h2 className="bid-title">Place a Bid</h2>
        <form className="bid-form" onSubmit={handleSubmit}>
          <h3 className="bid-item-name">{name}</h3>
          {error && <p className="bid-error">{errorMessage}</p>}
          <label htmlFor="amount" className="bid-label">
            Bidding Amount
          </label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={parseFloat(price) + 0.01}
            step="0.01"
            required
            className="bid-input"
          />
          <button type="submit" className="bid-button">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
};

export default BidProduct;
