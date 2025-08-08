
import { Schema, model } from "mongoose";
const StockSchema = new Schema({
  item: { type: String, required: true, unique: true },
  totalStock: { type: Number, required: true },
  balanceStock: { type: Number, required: true },
  price: { type: Number, required: true },
  manufacturingDate: { type: Date, required: true }, // FIXED
  expiryDate: { type: Date, required: true },         // FIXED
  date: { type: Date, default: Date.now },
  totalProfit: { type: Number, required: true }
});


export default model("Stock", StockSchema);