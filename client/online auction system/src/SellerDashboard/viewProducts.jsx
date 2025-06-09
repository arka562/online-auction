import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./ViewProducts.css";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(15);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const sellerID = localStorage.getItem("seller_id");
        const response = await fetch(
          `http://localhost:4000/api/seller/products/${sellerID}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const pollingInterval = setInterval(fetchProducts, 5000);

    fetchProducts();

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="view-products-container">
      <div className="header-section">
        <h2 className="title">Product List</h2>
      </div>
      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Seller ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Starting Price</th>
              <th>Auction End Time</th>
              <th>Category</th>
              <th>Last Bidder</th>
              <th>Last Bid</th>
            </tr>
          </thead>
          <tbody>
            {loading || error || currentProducts.length === 0 ? (
              <tr>
                <td colSpan="9" className="message-cell">
                  {loading
                    ? "Loading..."
                    : error
                    ? `Error: ${error}`
                    : "No products found"}
                </td>
              </tr>
            ) : (
              currentProducts.map((product) => (
                <tr key={`${product.item_id}-${product.seller_id}`}>
                  <td>{product.item_id}</td>
                  <td>{product.seller_id}</td>
                  <td>{product.item_name}</td>
                  <td>{product.description}</td>
                  <td>{product.starting_price}</td>
                  <td>{new Date(product.auction_end_time).toLocaleString()}</td>
                  <td>{product.category}</td>
                  <td>{product.last_bidder || "None"}</td>
                  <td>{product.last_bid || "None"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination-controls">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="page-btn"
        >
          <FiChevronLeft />
        </button>
        <span className="current-page">{currentPage}</span>
        <button
          onClick={nextPage}
          disabled={currentPage >= Math.ceil(products.length / productsPerPage)}
          className="page-btn"
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ViewProducts;
