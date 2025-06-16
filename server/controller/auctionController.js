import asyncHandler from "../utils/asyncHandler.js";
import Auction from "../models/Auction.js";
import Item from "../models/Item.js";

const getAuctions = asyncHandler(async (req, res) => {
  // Fetch auctions and populate item details
  const auctions = await Auction.find()
    .populate("itemId", "itemName description")
    .lean();

  const formatted = auctions.map((auction) => ({
    ...auction,
    Item_Name: auction.itemId?.itemName || "",
    Description: auction.itemId?.description || "",
  }));

  res.json({ items: formatted });
});
export  {getAuctions};
