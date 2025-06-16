import express from "express";
import {getSeller} from "../controller/sellerController.js";

const router = express.Router();

// GET seller by ID
router.get("/:id", getSeller);

export default router;
