// models/stockBillModule.js
import mongoose from "mongoose";

const BillSchema = new mongoose.Schema({
  billno: { type: String, required: true },
  costmername: { type: String, required: true },
  contact: { type: String, required: true },
  item: { type: String, required: true },
  quantity: { type: String, required: true },
  tolalprice: { type: Number, required: true },
  paymentstatus: { type: String, required: true },
  Balanceamount: { type: Number },
});

export default mongoose.model("Bill", BillSchema);
