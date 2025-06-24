import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

      const response = await fetch("http://localhost:4000/api/bid", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemName: name,
          amount: parsedAmount,
          last_bidder: localStorage.getItem("username"),
        }),
      });
      console.log("Username from storage:", body.last_bidder);

      let data;
      try {
        data = await response.json();
      } catch (err) {
        data = null;
      }

      if (response.ok && data?.message === "Bid placed successfully") {
        setError(false);
        navigate("/products");
      } else {
        setError(true);
        setErrorMessage(
          data?.message || "Failed to place bid. Please try again."
        );
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
            min={price ? parseFloat(price) + 0.01 : 0}
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
