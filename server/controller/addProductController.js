import asyncHandler from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/responseHandler.js";
import Item from "../models/Item.js";
import Auction from "../models/Auction.js";

const addProduct = asyncHandler(async (req, res) => {
  const {
    itemName,
    description,
    startingPrice,
    auctionEndTime,
    category,
  } = req.body;
  const sellerID = req.user.id;

  const currentTime = new Date();

  // Determine auction status
  let auctionStatus = "";
  if (currentTime < new Date(auctionEndTime)) {
    auctionStatus = "Pending";
  } else if (currentTime >= new Date(auctionEndTime)) {
    auctionStatus = "Closed";
  } else {
    auctionStatus = "Active";
  }

  // Create Item
  const item = new Item({
    sellerId: sellerID,
    itemName,
    description,
    startingPrice,
    auctionEndTime,
    category,
    lastBidder: null,
    lastBid: startingPrice,
  });

  await item.save();

  // Create Auction
  const auction = new Auction({
    itemId: item._id,
    auctionStartTime: new Date(),
    auctionEndTime,
    auctionStatus,
    reservePrice: startingPrice,
  });

  await auction.save();

  sendSuccess(res, { message: "Product added successfully" });
}, "Failed to add product");
export {addProduct};