import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [billCount, setBillCount] = useState(0);

  useEffect(() => {
    fetchPendingBills();
    fetchBillCount();
  }, []);

  const fetchPendingBills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bills/getAllBills");
      const pendingBills = res.data.filter((bill) => bill.paymentstatus !== "Paid");
      setPendingCount(pendingBills.length);
    } catch (err) {
      console.error("Failed to fetch pending bills:", err);
    }
  };

  const fetchBillCount = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bills/count");
      setBillCount(res.data.count);
    } catch (err) {
      console.error("Failed to fetch bill count:", err);
    }
  };

  const cardStyle = "bg-gray-800 rounded-xl p-4 shadow-md text-white";

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Bills Card */}
        <div className={cardStyle}>
          <h2 className="text-lg font-medium">Total Bills</h2>
          <p className="text-3xl font-bold mt-2">{billCount}</p>
        </div>

        {/* Pending Bills Card */}
        <div className={cardStyle}>
          <h2 className="text-lg font-medium">Pending Bills</h2>
          <p className="text-3xl font-bold mt-2 -400">{pendingCount}</p>
        </div>

        {/* Add more cards here for profit, stock, etc. */}
      </div>
    </div>
  );
};

export default Dashboard;
