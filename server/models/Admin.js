// models/Admin.js
import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: String,
  password: {
    type: String,
    required: true,
  },
  address: String,
  accountBalance: Number,
}, { timestamps: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
