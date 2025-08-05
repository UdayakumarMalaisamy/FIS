import cron from "node-cron";
import Stock from "../models/StockModels.js"; // adjust path

cron.schedule("0 1 * * *", async () => {
  console.log("🧪 Checking for expired fertilizers...");

  const today = new Date();
  await Stock.updateMany(
    { experideDate: { $lt: today } },
    { $set: { expired: true } }
  );
});
