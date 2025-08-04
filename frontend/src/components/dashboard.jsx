import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [billCount, setBillCount] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [previousProfit, setPreviousProfit] = useState(0);
  const [pendingBills, setPendingBills] = useState(0);
  const [lowStock, setLowStock] = useState(0);

  useEffect(() => {
    const fetchBillCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bills/count");
        setBillCount(res.data.count);
      } catch (err) {
        console.error("Failed to fetch bill count:", err);
      }
    };

    const fetchTotalProfit = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bills/totalProfit");
        setTotalProfit(res.data.totalProfit);
      } catch (err) {
        console.error("Failed to fetch total profit:", err);
      }
    };

    const fetchPreviousMonthProfit = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bills/previousMonthProfit");
        setPreviousProfit(res.data.totalProfit);
      } catch (err) {
        console.error("Failed to fetch previous month profit:", err);
      }
    };

    const fetchPendingBills = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bills/pendingBillCount");
        setPendingBills(res.data.count);
      } catch (err) {
        console.error("Failed to fetch pending bill count:", err);
      }
    };

    const fetchLowStock = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bills/lowstockProduct");
        setLowStock(res.data.count);
      } catch (err) {
        console.error("Failed to fetch low stock count:", err);
      }
    };

    fetchBillCount();
    fetchTotalProfit();
    fetchPreviousMonthProfit();
    fetchPendingBills();
    fetchLowStock();
  }, []);

  const cardStyle = "bg-gray-800 text-white shadow-md p-4 rounded-lg text-center";

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={cardStyle}>
          <h2 className="text-lg font-medium">Total Bills</h2>
          <p className="text-3xl font-bold">{billCount}</p>
        </div>

        <div className={cardStyle}>
          <h2 className="text-lg font-medium">Total Profit</h2>
          <p className="text-3xl font-bold">₹{totalProfit}</p>
        </div>

        <div className={cardStyle}>
          <h2 className="text-lg font-medium">Previous Month Profit</h2>
          <p className="text-3xl font-bold">₹{previousProfit}</p>
        </div>

        <div className={cardStyle}>
          <h2 className="text-lg font-medium">Pending Bills</h2>
          <p className="text-3xl font-bold">{pendingBills}</p>
        </div>

        <div className={cardStyle}>
          <h2 className="text-lg font-medium">Low Stock Products</h2>
          <p className="text-3xl font-bold">{lowStock}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
