import asyncHandler from "../utils/asyncHandler.js";
import Buyer from "../models/Buyer.js";
import Seller from "../models/Seller.js";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

const register = asyncHandler(async (req, res) => {
  const { username, password, userType, email, address, accountBalance } = req.body;

  if (!username || !password || !userType) {
    return res.status(400).json({ message: "Username, password, and userType are required" });
  }

  let UserModel;
  if (userType === "buyer") {
    UserModel = Buyer;
  } else if (userType === "seller") {
    UserModel = Seller;
  } else if (userType === "admin") {
    UserModel = Admin;
  } else {
    return res.status(400).json({ message: "Invalid user type" });
  }
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }
  const newUser = new UserModel({
    username,
    password,
    ...(email && { email }),
    ...(address && { address }),
    ...(accountBalance && { accountBalance })
  });

  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "2d",
  });
};

const login = asyncHandler(async (req, res) => {
  console.log("Received authentication request");
  console.log("Request body:", JSON.stringify(req.body, null, 2));

  const { username, password, userType } = req.body;

  let UserModel;
  if (userType === "buyer") {
    UserModel = Buyer;
  } else if (userType === "seller") {
    UserModel = Seller;
  } else if (userType === "admin") {
    UserModel = Admin;
  } else {
    return res.status(400).json({ message: "Invalid user type" });
  }

  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isAuthenticated = password === user.password; // Use bcrypt in production
  if (!isAuthenticated) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = generateToken({
    id: user._id,
    userType,
  });

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user._id,
      username: user.username,
      userType,
    },
  });

  console.log("Authentication response sent");
});

export { register,login };
