import asyncHandler from "../utils/asyncHandler.js";
import Transaction from "../models/Transaction.js";

const getTransaction = asyncHandler(
  async (req, res) => {
    console.log("Received API request");

    const transactions = await Transaction.find()
      .populate("buyerId", "username")
      .populate("sellerId", "username")
      .lean();

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: "No transactions found" });
    }

    const formatted = transactions.map(txn => ({
      ...txn,
      buyerName: txn.buyerId?.username || "N/A",
      sellerName: txn.sellerId?.username || "N/A",
    }));

    console.log("Fetched transactions:", formatted);
    res.json({ items: formatted });
  },
  "Error fetching transactions"
);
export {getTransaction};