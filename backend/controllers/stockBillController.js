import Bill from '../models/stockBillModule.js';

// CREATE BILL
export async function createBill(req, res) {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// GET ALL BILLS
export async function getAllBills(req, res) {
  try {
    const bills = await Bill.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}       

  // UPDATE BILL
export async function updateBill(req, res) {
    try {
        const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        res.status(200).json(bill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }           
} 
   
// DELETE BILL 
export async function deleteBill(req, res) {
    try {
        const bill = await Bill.findByIdAndDelete(req.params.id);
        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        res.status(200).json({ message: "Bill deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
} 
