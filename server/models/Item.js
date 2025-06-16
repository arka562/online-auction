import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  itemName: String,
  description: String,
  startingPrice: Number,
  auctionEndTime: Date,
  category: String,
  lastBidder: { type: mongoose.Schema.Types.ObjectId, default: null },
  lastBid: Number,
}, { timestamps: true });


const Item = mongoose.model("Item", itemSchema);

export default Item;
