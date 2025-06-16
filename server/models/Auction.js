import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item", required: true },
  auctionStartTime: Date,
  auctionEndTime: Date,
  auctionStatus: String,
  reservePrice: Number,
}, { timestamps: true });

const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;
