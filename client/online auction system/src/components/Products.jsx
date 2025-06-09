import React, { useEffect, useState } from "react";
import EditButton from "./EditButton";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const activeProducts = data.items.filter(
          (product) => product.auction_status === "Active"
        );
        setProducts(activeProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    const pollingInterval = setInterval(fetchProducts, 1000);
    fetchProducts();
    return () => clearInterval(pollingInterval);
  }, []);

  const displayCountdown = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const formatted = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    return diff <= 900000 ? (
      <span className="countdown-warning">{formatted}</span>
    ) : (
      formatted
    );
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const calculateCountdown = (endTime) => new Date(endTime) - new Date();
  currentProducts.sort(
    (a, b) =>
      calculateCountdown(a.auction_end_time) -
      calculateCountdown(b.auction_end_time)
  );

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <div className="products-container">
      <div className="products-header">
        <h2>Product List</h2>
      </div>
      <div className="products-table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Base Price</th>
              <th>Last Bidder</th>
              <th>Seller</th>
              <th>Last Bid</th>
              <th>Countdown</th>
              <th>BID</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="7">Error: {error}</td>
              </tr>
            ) : currentProducts.length === 0 ? (
              <tr>
                <td colSpan="7">No products available</td>
              </tr>
            ) : (
              currentProducts.map((product, index) => (
                <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                  <td>{product.item_name}</td>
                  <td>{product.starting_price}</td>
                  <td>{product.last_bidder || "None"}</td>
                  <td>{product.seller_username}</td>
                  <td>{product.last_bid || product.starting_price}</td>
                  <td>{displayCountdown(product.auction_end_time)}</td>
                  <td>
                    <EditButton product={product} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          <FiChevronLeft />
        </button>
        <span>{currentPage}</span>
        <button
          onClick={nextPage}
          disabled={indexOfLastProduct >= products.length}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Products;
