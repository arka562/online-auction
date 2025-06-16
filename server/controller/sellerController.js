import asyncHandler from "../utils/asyncHandler.js";
import Seller from "../models/Seller.js";

const getSeller = asyncHandler(async (req, res) => {
  console.log("Received request to fetch seller by ID");

  const sellerId = req.params.id;

  const seller = await Seller.findById(sellerId).lean();

  if (!seller) {
    return res.status(404).json({ error: "Seller not found" });
  }

  const sellerName = seller.name;

  console.log("Received seller name from database:", sellerName);

  res.json({ sellerName });
});
export {
  getSeller,
};
