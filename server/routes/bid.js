import express from "express";
import {bidItem} from "../controller/bidController.js";

const router = express.Router();

router.use(express.json());

router.post("/bid", bidItem);

export default router;
