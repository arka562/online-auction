// controller/buyersController.js
import { getBuyerById, getTransactionsByBuyerId } from "../utils/dbUtils.js";
import asyncHandler from "../utils/asyncHandler.js";
import { send404, sendSuccess } from "../utils/responseHandler.js";

const fetchBuyerById = asyncHandler(async (req, res) => {
  const buyerId = req.params.id;
  const buyer = await getBuyerById(buyerId);

  if (!buyer) {
    return send404(res, "Buyer not found");
  }

  sendSuccess(res, buyer);
});

const fetchTransactionsByBuyer = asyncHandler(async (req, res) => {
  const buyerId = req.query.buyer_id;
  const transactions = await getTransactionsByBuyerId(buyerId);
  sendSuccess(res, transactions);
});
export {
  fetchBuyerById,
  fetchTransactionsByBuyer
}
