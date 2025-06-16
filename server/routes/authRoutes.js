import express from "express";
import { login,register } from "../controller/authController.js";

const router = express.Router();

router.use(express.json());

router.get("/login", login);
router.get("/register", register);

export default router;
