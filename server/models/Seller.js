import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  username: String,
  password:String,
  email: String,
  address: String,
  accountBalance: Number,
});

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;