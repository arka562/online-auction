import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  address: String,
  accountBalance: Number,
});


const Buyer = mongoose.model("Buyer", buyerSchema);

export default Buyer;