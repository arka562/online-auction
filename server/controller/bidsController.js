import asyncHandler from "../utils/asyncHandler.js";
import Bid from "../models/Bid.js";

 const getBids = asyncHandler(async (req, res) => {
  console.log("Received API request");

  const bids = await Bid.find()
    .populate("bidderId", "username") // Assuming Bid schema has 'bidderId' ref to Buyer
    .populate("itemId", "itemName")   // Assuming Bid schema has 'itemId' ref to Item
    .lean();

  const formatted = bids.map(bid => ({
    ...bid,
    Bidder_Name: bid.bidderId?.username,
    Item: bid.itemId?.itemName,
  }));

  console.log("Fetched Bids from MongoDB:", formatted);

  res.json({ items: formatted });
});
export {getBids};
