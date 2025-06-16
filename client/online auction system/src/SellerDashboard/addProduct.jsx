import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./addProduct.css";

const AddsellerProd = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [endTime, setEndTime] = useState("");
  const [auctionStartTime, setAuctionStartTime] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:4000/api/addProduct",
        {
          itemName: name,
          description: description,
          startingPrice: price,
          auctionStartTime: auctionStartTime,
          auctionEndTime: endTime,
          category: category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        navigate("/seller/products");
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="addsellerprod-container font-poppins">
      <div className="addsellerprod-wrapper">
        <h2 className="addsellerprod-heading">Add a new product</h2>
        <form className="addsellerprod-form" onSubmit={handleSubmit}>
          <label htmlFor="name" className="addsellerprod-label">
            Name of the product
          </label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="addsellerprod-input"
          />

          <label htmlFor="description" className="addsellerprod-label">
            Description
          </label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="addsellerprod-textarea"
          ></textarea>

          <label htmlFor="price" className="addsellerprod-label">
            Starting price
          </label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="addsellerprod-input"
          />

          <label htmlFor="auctionStartTime" className="addsellerprod-label">
            Auction Start Time
          </label>
          <input
            type="datetime-local"
            name="auctionStartTime"
            value={auctionStartTime}
            onChange={(e) => setAuctionStartTime(e.target.value)}
            required
            className="addsellerprod-input"
          />

          <label htmlFor="endTime" className="addsellerprod-label">
            Auction End Time
          </label>
          <input
            type="datetime-local"
            name="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
            className="addsellerprod-input"
          />

          <label htmlFor="category" className="addsellerprod-label">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="addsellerprod-input"
          />

          <button type="submit" className="addsellerprod-submit-button">
            SEND
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddsellerProd;
