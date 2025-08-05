import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";

config();

const app = express();
app.use(cors());
app.use(json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB error:", err));

import stockRoutes from "./routes/StockRoute.js"; 
app.use("/api/stocks", stockRoutes); 

import stockBillRoutes from "./routes/StockBillRoute.js";
app.use("/api/bills", stockBillRoutes);

import authRoutes from "./routes/authRoute.js";
app.use("/api/auth", authRoutes);

 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
