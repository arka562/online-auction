import asyncHandler from "../utils/asyncHandler.js";
import Buyer from "../models/Buyer.js";
import Transaction from "../models/Transaction.js";

 const getBuyer = asyncHandler(async (req, res) => {
  const buyerId = req.params.id;

  const buyer = await Buyer.findById(buyerId).lean();

  if (!buyer) {
    return res.status(404).json({ error: "Buyer not found" });
  }

  res.json(buyer);
});

 const getTransaction = asyncHandler(async (req, res) => {
  const buyerId = req.query.buyer_id;

  const transactions = await Transaction.find({ buyerId }).lean();

  res.json(transactions);
});
export {
  getBuyer,
  getTransaction
};