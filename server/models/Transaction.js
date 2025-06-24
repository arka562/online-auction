// models/Transaction.js
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  buyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Buyer", // ✅ Must match your model declaration
    required: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller", // ✅ Correct casing
    required: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item", // ✅ Correct casing
    required: true
  },
  transactionAmount: {
    type: Number,
    required: true
  },
  transactionTime: {
    type: Date,
    default: Date.now 
  },
  paymentMethod: {
    type: String,
    enum: ["Credit Card", "UPI", "Net Banking", "Cash", "Wallet"], 
    required: true
  },
  transactionStatus: {
    type: String,
    enum: ["Completed", "Incompleted"],
    required: true
  }
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
