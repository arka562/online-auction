import express from "express";
import {getTransaction} from "../controller/transactionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all transactions
router.get("/",authMiddleware, getTransaction);

export default router;
