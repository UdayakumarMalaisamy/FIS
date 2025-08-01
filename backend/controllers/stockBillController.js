// controllers/stockBillController.js
import Bill from "../models/stockBillModule.js";

export async function createBill(data) {
  const bill = new Bill(data);
  return await bill.save();
}

export async function getAllBills(req, res) {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateBill(req, res) {
  try {
    const updated = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteBill(req, res) {
  try {
    const deleted = await Bill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
