import express from "express";
import {getTransaction} from "../controller/transactionController.js";

const router = express.Router();

// GET all transactions
router.get("/", getTransaction);

export default router;
