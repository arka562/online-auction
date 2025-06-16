import express from "express";
import {addProduct} from "../controller/addProductController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",authMiddleware("seller") ,addProduct);

export default router;
