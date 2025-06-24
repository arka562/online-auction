import Item from "../models/Item.js";
import Buyer from "../models/Buyer.js";

const bidItem = async (req, res) => {
  const { itemName, amount, last_bidder } = req.body;
  console.log(itemName, amount, last_bidder);

  try {
    const bidAmount = parseFloat(amount);
    if (isNaN(bidAmount)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Invalid bid amount provided",
      });
    }

    // Find the buyer by username
    const buyer = await Buyer.findOne({ username: last_bidder });
    if (!buyer) {
      return res.status(404).json({
        error: "Not Found",
        message: "Buyer not found",
      });
    }

    // Find the item by name
    const item = await Item.findOne({ itemName });
    if (!item) {
      return res.status(404).json({
        error: "Not Found",
        message: "Item not found",
      });
    }

    if (bidAmount <= item.lastBid) {
      return res.status(400).json({
        error: "Bad Request",
        message: `Bid must be higher than current bid of ₹${item.lastBid}`,
      });
    }

    // Update the item with new bid
    item.lastBidder = buyer._id;
    item.lastBid = bidAmount;
    await item.save();

    res.status(200).json({ message: "Bid placed successfully" });
  } catch (error) {
    console.error("Error placing bid:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred",
      debug: error.message,
    });
  }
};

export { bidItem };
