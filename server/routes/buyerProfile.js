import express from "express";
import {getBuyer,getTransaction} from "../controller/buyerProfileController.js";

const router = express.Router();

// Endpoint to fetch buyer information by ID
router.get("/buyers/:id", getBuyer);

// Endpoint to fetch transactions by buyer ID
router.get("/transactions",getTransaction);

export default router;
