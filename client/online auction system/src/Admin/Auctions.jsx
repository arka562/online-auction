import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Auctions.css"; // Import CSS file

const Auctions = () => {
  const [auctions, setAuctions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const auctionsPerPage = 15;

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/auctions");
        if (!response.ok) {
          throw new Error("Failed to fetch Auctions");
        }
        const data = await response.json();
        setAuctions(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Auctions:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    const pollingInterval = setInterval(fetchAuctions, 5000);
    fetchAuctions();

    return () => clearInterval(pollingInterval);
  }, []);

  const indexOfLastAuction = currentPage * auctionsPerPage;
  const indexOfFirstAuction = indexOfLastAuction - auctionsPerPage;
  const currentAuctions = auctions
    ? auctions.slice(indexOfFirstAuction, indexOfLastAuction)
    : [];

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="auctions-container">
      <div className="auctions-wrapper">
        <div className="auctions-header">
          <h2>Auctions History</h2>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Description</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Reserve Price</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="center-text">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="center-text">
                    Error: {error}
                  </td>
                </tr>
              ) : (
                currentAuctions.map((auction, index) => (
                  <tr
                    key={auction.Auction_ID}
                    className={index % 2 === 0 ? "row-even" : "row-odd"}
                  >
                    <td>{auction.Auction_ID}</td>
                    <td>{auction.Item_Name}</td>
                    <td>{auction.Description}</td>
                    <td>{auction.Auction_Start_Time}</td>
                    <td>{auction.Auction_End_Time}</td>
                    <td>{auction.Auction_Status}</td>
                    <td>{auction.Reserve_Price}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            aria-label="Previous Page"
          >
            <FiChevronLeft />
          </button>
          <span>{currentPage}</span>
          <button
            onClick={nextPage}
            disabled={currentAuctions.length < auctionsPerPage}
            aria-label="Next Page"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auctions;
