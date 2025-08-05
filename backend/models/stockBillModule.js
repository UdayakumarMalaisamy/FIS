import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const billSchema = new mongoose.Schema({
  billno: { type: Number, required: true, unique: true },
  costmername: { type: String, required: true },
  contact: { type: String, required: true },
  items: [itemSchema], // multiple items here
  tolalprice: { type: Number, required: true },
  paymentstatus: { type: String, enum: ["Paid", "Partial", "Unpaid"], required: true },
  Balanceamount: { type: Number },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Bill", billSchema);
