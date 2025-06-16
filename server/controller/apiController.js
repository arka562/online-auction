import asyncHandler from "../utils/asyncHandler.js";
import Item from "../models/Item.js";
import Auction from "../models/Auction.js";
import Seller from "../models/Seller.js";

const getItems = asyncHandler(async (req, res) => {
  // Fetch items with seller info and auction status
  const items = await Item.find()
    .populate("sellerId", "Username Email Address Account_Balance") // populate seller fields
    .lean(); // lean for plain JS objects

  const itemIds = items.map((item) => item._id);

  const auctions = await Auction.find({ itemId: { $in: itemIds } })
    .select("itemId auctionStatus")
    .lean();

  // Merge auction status into each item
  const auctionMap = {};
  auctions.forEach((auction) => {
    auctionMap[auction.itemId.toString()] = auction.auctionStatus;
  });

  const enrichedItems = items.map((item) => ({
    ...item,
    Seller_Username: item.sellerId?.Username || "",
    Seller_Email: item.sellerId?.Email || "",
    Seller_Address: item.sellerId?.Address || "",
    Seller_Account_Balance: item.sellerId?.Account_Balance || 0,
    Auction_Status: auctionMap[item._id.toString()] || "Unknown",
  }));

  res.json({ items: enrichedItems });
});
export  {
  getItems
};