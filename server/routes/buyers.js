// routes/buyers.js
import express from "express";
import {fetchBuyerById,fetchTransactionsByBuyer} from "../controller/buyersController.js";

const router = express.Router();

// GET /buyers/:id - Get buyer by ID
router.get("/buyers/:id", fetchBuyerById);

// GET /transactions?buyer_id=123 - Get transactions for a buyer
router.get("/transactions", fetchTransactionsByBuyer);

export default router;
