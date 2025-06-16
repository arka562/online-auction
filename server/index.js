// server.js
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

const app = express();
const server = http.createServer(app);
const PORT = 4000;
dotenv.config();
await connectDB();
// Import routes
import apiRoutes from "./routes/api.js";
import sellerRoutes from "./routes/seller.js";
import authRoutes from "./routes/authRoutes.js";
import bidRoute from "./routes/bid.js";
import addProdRoute from "./routes/addProduct.js";
import getProductsBySeller from "./routes/sellerProductRoute.js";
import auctionsRoute from "./routes/auction.js";
import transactionsRoute from "./routes/transactions.js";
import bidsRoute from "./routes/bids.js";
import buyerProfileRoute from "./routes/buyerProfile.js";
import buyersRoute from "./routes/buyers.js";

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Or replace with app.use(express.json());

// Routes
app.use("/api", apiRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api", authRoutes);
app.use("/api/bid", bidRoute);
app.use("/api/addProduct", addProdRoute);
app.use("/api/seller/products", getProductsBySeller);
app.use("/api/auctions", auctionsRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/placedbids", bidsRoute);
app.use("/api", buyerProfileRoute);
app.use("/api/buyers", buyersRoute);

// Start server
server.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
