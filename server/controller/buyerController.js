import asyncHandler from "../utils/asyncHandler.js";
import Item from "../models/Item.js";
import Seller from "../models/Seller.js";

const getActiveProducts = asyncHandler(async (req, res) => {
  const items = await Item.find({
    auctionEndTime: { $gt: new Date() }, // auction still running
  })
    .populate("sellerId", "username")
    .lean();

  const formattedItems = items.map((item) => ({
    itemName: item.itemName, // use camelCase for consistency with frontend
    startingPrice: item.startingPrice,
    lastBidder: item.lastBidder || null,
    auctionEndTime: item.auctionEndTime,
    sellerUsername: item.sellerId?.username || "Unknown",
    lastBid: item.lastBid || item.startingPrice,
  }));

  console.log("Fetched items from DB:", formattedItems); // ✅ log before sending

  res.json({ items: formattedItems }); // ✅ send response only once
});

export { getActiveProducts };
