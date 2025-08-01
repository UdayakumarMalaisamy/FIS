// routes/billRoutes.js
import express from "express";
const router = express.Router();

import Counter from "../models/counterModule.js";
import { createBill, getAllBills, updateBill, deleteBill } from "../controllers/stockBillController.js";


// Auto-increment and create bill
router.post("/createBill", async (req, res) => {
  try {
    const counter = await Counter.findOneAndUpdate(
      { name: "billno" },
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    const billno = "BILL" + String(counter.count).padStart(3, "0");
    req.body.billno = billno;

    const newBill = await createBill(req.body);
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAllBills", getAllBills);
router.put("/updateBill/:id", updateBill);
router.delete("/deleteBill/:id", deleteBill);

export default router;
