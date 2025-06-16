import express from "express";
import {getBids} from "../controller/bidsController.js";

const router = express.Router();

router.get("/", getBids);

export default router;
