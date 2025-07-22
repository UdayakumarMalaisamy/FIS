import Stock from "../models/StockModels.js";
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

export async function getAllStocks(req, res) {
  try {
    const stocks = await Stock.find();
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
 //DELETE STOCK //

export async function deleteStock(req, res) {
  try {
    const { id } = req.params;
    const stock = await Stock.findByIdAndDelete(id);
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
        //UPDATE STOCK//
export async function updateStock(req, res) {
  try {
    const { id } = req.params;
    const stock = await Stock.find          
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
    }