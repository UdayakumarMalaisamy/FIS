import Bill from "../models/stockBillModule.js";
import Counter from "../models/counterModule.js";

// Create bill with auto-increment
export async function createBill(req, res) {
  try {
    // Auto-increment billno
    const counter = await Counter.findOneAndUpdate(
      { name: "bill" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    const billData = {
      ...req.body,
      billno: counter.value,
    };

    const bill = new Bill(billData);
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get all bills
export async function getAllBills(req, res) {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update a bill
export async function updateBill(req, res) {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Delete a bill
export async function deleteBill(req, res) {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
// Bill count

export async function billcount (req, res) {
  try {
    const count = await Bill.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}