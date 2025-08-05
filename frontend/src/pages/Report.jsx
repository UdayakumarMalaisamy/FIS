import { useEffect, useState } from "react";
import axios from "axios";

const Report = () => {
  const [, setBills] = useState([]);
  const [paidBills, setPaidBills] = useState([]);
  const [balanceBills, setBalanceBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bills/getAllBills");
      setBills(res.data);

      const paid = res.data.filter((bill) => bill.paymentstatus === "Paid");
      const balance = res.data.filter((bill) => bill.paymentstatus !== "Paid");

      setPaidBills(paid);
      setBalanceBills(balance);
    } catch (err) {
      console.error("Failed to fetch report data:", err);
    }
  };

  const handlePayAmount = async (bill) => {
    const amountStr = prompt(
      `Enter amount paid by ${bill.costmername} (Balance: ₹${bill.Balanceamount})`
    );
    if (!amountStr) return;

    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    let newBalance = bill.Balanceamount - amount;
    let newStatus = newBalance <= 0 ? "Paid" : "Partial";

    try {
      await axios.put(`http://localhost:5000/api/bills/updateBill/${bill._id}`, {
        Balanceamount: newBalance < 0 ? 0 : newBalance,
        paymentstatus: newStatus,
      });
      fetchBills();
    } catch (err) {
      console.error("Error updating bill:", err);
    }
  };

  const renderTable = (data, isPaid) => (
    <table className="w-full border border-gray-700 text-sm mt-4">
      <thead className="bg-gray-800">
        <tr>
          <th className="border border-gray-700 px-3 py-2 text-white">Bill No</th>
          <th className="border border-gray-700 px-3 py-2 text-white">Customer</th>
          <th className="border border-gray-700 px-3 py-2 text-white">Contact</th>
          <th className="border border-gray-700 px-3 py-2 text-white">Items</th>
          <th className="border border-gray-700 px-3 py-2 text-white">Total</th>
          <th className="border border-gray-700 px-3 py-2 text-white">Status</th>
          <th className="border border-gray-700 px-3 py-2 text-white">Balance</th>
          <th className="border border-gray-700 px-3 py-2 text-white">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((bill) => (
          <tr key={bill._id} className="hover:bg-gray-800">
            <td className="border border-gray-700 px-3 py-2 text-white">{bill.billno}</td>
            <td className="border border-gray-700 px-3 py-2 text-white">{bill.costmername}</td>
            <td className="border border-gray-700 px-3 py-2 text-white">{bill.contact}</td>
            <td className="border border-gray-700 px-3 py-2 text-white">
              <ul className="list-disc list-inside">
                {bill.items.map((itm, idx) => (
                  <li key={idx}>
                    {itm.item} (x{itm.quantity}) - ₹{itm.price}
                  </li>
                ))}
              </ul>
            </td>
            <td className="border border-gray-700 px-3 py-2 text-white">₹{bill.tolalprice}</td>
            <td className="border border-gray-700 px-3 py-2 text-white">{bill.paymentstatus}</td>
            <td className="border border-gray-700 px-3 py-2 text-white">₹{bill.Balanceamount}</td>
            <td className="border border-gray-700 px-3 py-2 text-center">
              {!isPaid ? (
                <button
                  onClick={() => handlePayAmount(bill)}
                  className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                >
                  Pay
                </button>
              ) : (
                <span className="text-green-500 font-semibold">✔</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen font-sans">
      <h1 className="text-2xl font-bold mb-4">Payment Report</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2 text-dark-400">Full Payments</h2>
      {paidBills.length > 0 ? (
        renderTable(paidBills, true)
      ) : (
        <p className="text-gray-400">No full payments found.</p>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-2 text-dark-400">Pending / Partial Payments</h2>
      {balanceBills.length > 0 ? (
        renderTable(balanceBills, false)
      ) : (
        <p className="text-gray-400">No pending or partial payments found.</p>
      )}
    </div>
  );
};

export default Report;
