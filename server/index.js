// server.js
import express from "express";
const app = express();
const http = require("http").Server(app);
const PORT = 4000;

// Import middleware
import cors from "cors"
import bodyParser from "body-parser";

// Import routes
import apiRoutes from "./routes/api.js";
import sellerRoutes from "./routes/seller.js";
import authRoutes from "./routes/authRoutes.js";
import bidRoute from "./routes/bid.js";
import addProdRoute from "./routes/addProduct.js";
import getProductsBySeller from "./routes/sellerProductRoute.js";
import auctionsRoute from "./routes/auctions.js";
import transactionsRoute from "./routes/transactions.js";
import bidsRoute from "./routes/bids.js";
import buyerProfileRoute from "./routes/buyerProfile.js";



// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", apiRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/login", authRoutes);
app.use("/api/bid", bidRoute);
app.use("/api/addProduct", addProdRoute);
app.use("/api/seller/products", getProductsBySeller);
app.use("/api/auctions", auctionsRoute);
app.use("/api/transactions", transactionsRoute);
app.use("/api/placedbids", bidsRoute);
app.use("/api", buyerProfileRoute);

// // Define router for buyers and transactions
// const buyersRouter = require('./routes/buyers');
// app.use('/api', buyersRouter);

// Start server
http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});