// routes/billRoutes.js
import express from "express";
const router = express.Router();

import Counter from "../models/counterModule.js";
import Bill from "../models/stockBillModule.js"; // ✅ ADD THIS LINE
import {
  createBill,
  getAllBills,
  updateBill,
  deleteBill
} from "../controllers/stockBillController.js";

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


router.get("/count", async (req, res) => {
  try {
    const count = await Bill.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error("Error counting bills:", err);
    res.status(500).json({ error: "Failed to count bills" });
  }
});
router.get("/totalProfit", async (req, res) => {
  try {
    const totalProfit = await Bill.aggregate([
      { $group: { _id: null, totalProfit: { $sum: "$totalprofit" } } },
    ]);
    res.json({ totalProfit: totalProfit[0].totalProfit });
  } catch (err) {
    console.error("Error counting bills:", err);
    res.status(500).json({ error: "Failed to count bills" });
  }
});
router.get("/previousMonthProfit", async (req, res) => {
  try {
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    const totalProfit = await Bill.aggregate([
      { $match: { date: { $gte: previousMonth } } },
      { $group: { _id: null, totalProfit: { $sum: "$totalprofit" } } },
    ]);
    res.json({ totalProfit: totalProfit[0].totalProfit });
  } catch (err) {
    console.error("Error counting bills:", err);
    res.status(500).json({ error: "Failed to count bills" });
  }
});
router .get("/pendingBillCount", async (req, res) => {
  try {
    const pendingBillCount = await Bill.countDocuments({ paymentstatus: "Pending" });
    res.json({ count: pendingBillCount });
  } catch (err) {
    console.error("Error counting pending bills:", err);
    res.status(500).json({ error: "Failed to count pending bills" });
  }
})

router.get("/getAllBills", getAllBills);
router.put("/updateBill/:id", updateBill);
router.delete("/deleteBill/:id", deleteBill);

export default router;
