import Buyer from "../models/Buyer.js";
import Transaction from "../models/Transaction.js";

const getBuyerById = async (buyerId) => {
  return await Buyer.findById(buyerId);
};

const getTransactionsByBuyerId = async (buyerId) => {
  return await Transaction.find({ buyerId });
};

export {
  getBuyerById,
  getTransactionsByBuyerId,
};
