import Item from "../models/Item.js";
import Buyer from "../models/Buyer.js";

const bidItem = async (req, res) => {
  const { itemName, amount, last_bidder } = req.body;
  console.log(itemName, amount, last_bidder);

  try {
    const bidAmount = parseFloat(amount);
    if (isNaN(bidAmount)) {
      throw new Error("Invalid bid amount");
    }

    // Find the buyer by username
    const buyer = await Buyer.findOne({ username: last_bidder });
    if (!buyer) {
      throw new Error("Buyer not found");
    }

    // Find the item by name
    const item = await Item.findOne({ itemName });
    if (!item) {
      throw new Error("Item not found");
    }

    // Update the item with new bid
    item.lastBidder = buyer._id;
    item.lastBid = bidAmount;
    await item.save();

    res.status(200).json({ message: "Bid placed successfully" });
  } catch (error) {
    console.error("Error placing bid:", error.message);

    if (error.message === "Invalid bid amount") {
      res.status(400).json({
        error: "Bad Request",
        message: "Invalid bid amount provided",
      });
    } else if (error.message === "Buyer not found") {
      res.status(404).json({
        error: "Not Found",
        message: "Buyer not found",
      });
    } else if (error.message === "Item not found") {
      res.status(404).json({
        error: "Not Found",
        message: "Item not found",
      });
    } else {
      res.status(500).json({
        error: "Internal Server Error",
        debug: error.message,
      });
    }
  }
};
export {bidItem};
