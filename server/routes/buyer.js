import express from "express";
import { getActiveProducts } from "../controller/buyerController.js";

const router = express.Router();

router.get("/", getActiveProducts);

export default router;
