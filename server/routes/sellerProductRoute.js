import express from "express";
import {getProductBySeller} from "../controller/sellerProductRouteController.js";

const router = express.Router();

// GET products by seller ID
router.get("/:sellerId", getProductBySeller);

export default router;
