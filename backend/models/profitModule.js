import mongoose from "mongoose";
 
const profitSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  profit: 