import express from "express";
const router = express.Router();

import {
  createBill,
  getAllBills,
  updateBill,
  deleteBill,
  billcount,
} from "../controllers/stockBillController.js";

// Routes
router.post("/createBill", createBill);
router.get("/getAllBills", getAllBills);
router.put("/updateBill/:id", updateBill);
router.delete("/deleteBill/:id", deleteBill);
router.get ('/count', billcount);


export default router;
