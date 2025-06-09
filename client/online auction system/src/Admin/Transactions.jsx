import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(15);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch Transactions");
        }
        const data = await response.json();
        setTransactions(data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Transactions:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    const pollingInterval = setInterval(fetchTransactions, 5000);

    fetchTransactions();

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions
    ? transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
    : [];

  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div className="transactions-container">
      <div className="transactions-inner">
        <div className="transactions-header">
          <h2 className="transactions-title">Transactions History</h2>
        </div>

        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr className="transactions-thead-row">
                <th className="transactions-th">Transaction ID</th>
                <th className="transactions-th">Buyer</th>
                <th className="transactions-th">Seller</th>
                <th className="transactions-th">Amount (Rupees)</th>
                <th className="transactions-th">Transaction Time</th>
                <th className="transactions-th">Payment Method</th>
                <th className="transactions-th">Status</th>
              </tr>
            </thead>
            <tbody className="transactions-tbody">
              {loading ? (
                <tr>
                  <td colSpan="7" className="transactions-loading">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="transactions-loading">
                    Error: {error}
                  </td>
                </tr>
              ) : (
                currentTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.Transaction_ID}
                    className={
                      index % 2 === 0
                        ? "transactions-row-even"
                        : "transactions-row-odd"
                    }
                  >
                    <td className="transactions-td">
                      {transaction.Transaction_ID}
                    </td>
                    <td className="transactions-td">
                      {transaction.Buyer_Name}
                    </td>
                    <td className="transactions-td">
                      {transaction.Seller_Name}
                    </td>
                    <td className="transactions-td">
                      {transaction.Transaction_Amount}
                    </td>
                    <td className="transactions-td">
                      {transaction.Transaction_Time}
                    </td>
                    <td className="transactions-td">
                      {transaction.Payment_Method}
                    </td>
                    <td className="transactions-td">
                      {transaction.Transaction_Status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="transactions-pagination">
          <button
            className="transactions-button"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>
          <span className="transactions-page-indicator">{currentPage}</span>
          <button
            className="transactions-button"
            onClick={nextPage}
            disabled={currentTransactions.length < transactionsPerPage}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
