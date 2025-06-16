import express from "express";
import {getAuctions} from "../controller/auctionController.js";

const router = express.Router();

router.get("/", getAuctions);

export default router;
