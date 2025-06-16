import asyncHandler from "../utils/asyncHandler.js";
import Item from "../models/Item.js";

const getProductBySeller = asyncHandler(
  async (req, res) => {
    const { sellerId } = req.params;

    const items = await Item.find({ sellerId }).lean();

    if (!items || items.length === 0) {
      return res
        .status(404)
        .json({ error: "Seller not found or has no products" });
    }

    return res.json(items);
  },
  "Error fetching products by seller ID"
);
export {getProductBySeller};
