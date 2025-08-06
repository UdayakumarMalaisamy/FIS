import Stock from "../models/StockModels.js";
import corn from "node-cron"
         //CREATE STOCK//
export async function createStock(req, res) {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
        //GET ALL STOCKS//

export async function getAllStocks(req,res) {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
        //GET STOCK BY ID//
export async function updateStock(req, res) {
  try {
    const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stock) {       
      return res.status(404).json({ message: "Stock not found" });
    }
    res.status(200).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

          //DELETE STOCK BY ID//
export async function deleteStock(req, res) {
  try {
    const stock = await Stock.findByIdAndDelete(req.params.id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

//Expried Stock
export async function ExpiredStock(req, res) {
  try {
    const stocks = await Stock.find({ experideDate: { $lt: new Date() } });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

