import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Bids.css";

const Bids = () => {
  const [bids, setBids] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [bidsPerPage] = useState(15);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/placedbids");
        if (!response.ok) {
          throw new Error("Failed to fetch Bids");
        }
        const data = await response.json();
        setBids(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Bids:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    const pollingInterval = setInterval(fetchBids, 5000);

    fetchBids();

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  useEffect(() => {
    if (bids && currentPage > Math.ceil(bids.length / bidsPerPage)) {
      setCurrentPage(1);
    }
  }, [bids, currentPage, bidsPerPage]);

  const indexOfLastBid = currentPage * bidsPerPage;
  const indexOfFirstBid = indexOfLastBid - bidsPerPage;
  const currentBids = bids ? bids.slice(indexOfFirstBid, indexOfLastBid) : [];

  const nextPage = () => {
    if (currentPage < Math.ceil((bids?.length || 0) / bidsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bids-container font-poppins min-h-screen bg-gray-100">
      <div className="bids-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bids-header flex justify-between items-center mb-8">
          <h2 className="bids-title text-2xl font-semibold text-gray-800 pt-5">
            Bids Placed
          </h2>
        </div>

        <div className="bids-table-wrapper overflow-x-auto shadow-md rounded-lg">
          <table className="bids-table w-full table-auto border-collapse">
            <thead>
              <tr className="bids-thead-row bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="bids-th py-3 px-6 text-left">Bid ID</th>
                <th className="bids-th py-3 px-6 text-left">Bidder Name</th>
                <th className="bids-th py-3 px-6 text-left">Item</th>
                <th className="bids-th py-3 px-6 text-left">Bid Amount</th>
                <th className="bids-th py-3 px-6 text-left">Time of Bid</th>
                <th className="bids-th py-3 px-6 text-left">Status</th>
                <th className="bids-th py-3 px-6 text-left">Bid Increment</th>
              </tr>
            </thead>
            <tbody className="bids-tbody text-gray-600 text-sm font-light">
              {loading ? (
                <tr>
                  <td colSpan="7" className="py-4 px-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="py-4 px-6 text-center">
                    Error: {error}
                  </td>
                </tr>
              ) : (
                currentBids.map((bid, index) => (
                  <tr
                    key={bid.Bid_ID}
                    className={
                      index % 2 === 0 ? "bids-row-even" : "bids-row-odd"
                    }
                  >
                    <td className="bids-td py-4 px-6 border-b border-gray-200">
                      {bid.Bid_ID}
                    </td>
                    <td className="bids-td py-4 px-6 border-b border-gray-200">
                      {bid.Bidder_Name}
                    </td>
                    <td className="bids-td py-4 px-6 border-b border-gray-200">
                      {bid.Item}
                    </td>
                    <td className="bids-td py-4 px-6 border-b border-gray-200">
                      {bid.Bid_Amount}
                    </td>
                    <td className="bids-td py-4 px-6 border-b border-gray-200">
                      {bid.Bid_Time}
                    </td>
                    <td className="bids-td py-4 px-6 border-b border-gray-200">
                      {bid.Bid_Status}
                    </td>
                    <td className="bids-td py-4 px-6 border-b border-gray-200">
                      {bid.Bid_Increment}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="bids-pagination flex justify-center mt-4">
          <button
            className="bids-button px-3 py-1 rounded mr-2"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>
          <span className="bids-page-indicator px-3 py-1 rounded mr-2">
            {currentPage}
          </span>
          <button
            className="bids-button px-3 py-1 rounded"
            onClick={nextPage}
            disabled={currentBids.length < bidsPerPage}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bids;
