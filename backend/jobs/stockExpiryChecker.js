import cron from "node-cron";
import Stock from "../models/StockModels.js"
cron.schedule("0 * * * *", async () => {
  console.log(" Running stock expiry check...");

  const today = new Date();

  try {
    const expiredStocks = await Stock.find({
      experideDate: {$lt: today }
    });


    if (expiredStocks.length > 0) {
      console.log(" Expired stocks found:");
      
      expiredStocks.forEach((item) => {
        console.log(`- ${item.item} expired on ${item.experideDate}`);
      });
                            

    } else {
      console.log(" No expired stocks found.");
    }

  } catch (err) {
    console.error(" Error during cron job:", err);
  }
});
