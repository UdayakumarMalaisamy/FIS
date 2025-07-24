import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import stockRoutes from "./routes/StockRoute.js"; 
import stockBillRoutes from "./routes/StockBillRoute.js";
config();

const app = express();
app.use(cors());
app.use(json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB error:", err));


app.use("/api/stocks", stockRoutes); 
app.use("/api/bills", stockBillRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
