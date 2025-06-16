import express from "express";
import {getItems} from "../controller/apiController.js"; // import default export

const router = express.Router();

router.get("/", getItems); // access getItems from the exported object

export default router;