// models/counterModule.js
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, default: 0.0 },
});

export default mongoose.model("Counter", counterSchema);
