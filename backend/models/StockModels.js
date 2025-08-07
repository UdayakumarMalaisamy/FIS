
import { Schema, model } from "mongoose";

const StockSchema = new Schema({
  item: { type: String, required: true, unique: true },
  totalStock: { type: Number, required: true },
  balanceStock: { type: Number, required: true },
  price: { type: Number, required: true },
  Manafactureringdate: { type: Date, required: true },
  experideDate: { type: Date, required: true },
  date: { type: Date, default: Date.now },
  totalprofit: { type: Number, required: true },
});

export default model("Stock", StockSchema);