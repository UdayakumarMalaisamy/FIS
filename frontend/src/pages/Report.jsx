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
    const amountStr = prompt(`Enter amount paid by ${bill.costmername} (Balance: ₹${bill.Balanceamount})`);
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
        paymentstatus: newStatus
      });
      fetchBills();
    } catch (err) {
      console.error("Error updating bill:", err);
    }
  };

  const renderTable = (data, isPaid) => (
    <table className="min-w-full border-collapse my-4 text-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-3 py-2">Bill No</th>
          <th className="border px-3 py-2">Customer</th>
          <th className="border px-3 py-2">Contact</th>
          <th className="border px-3 py-2">Item</th>
          <th className="border px-3 py-2">Qty</th>
          <th className="border px-3 py-2">Total</th>
          <th className="border px-3 py-2">Payment</th>
          <th className="border px-3 py-2">Balance</th>
          <th className="border px-3 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((bill) => (
          <tr key={bill._id} className="hover:bg-gray-50">
            <td className="border px-3 py-2">{bill.billno}</td>
            <td className="border px-3 py-2">{bill.costmername}</td>
            <td className="border px-3 py-2">{bill.contact}</td>
            <td className="border px-3 py-2">{bill.item}</td>
            <td className="border px-3 py-2">{bill.quantity}</td>
            <td className="border px-3 py-2">₹{bill.tolalprice}</td>
            <td className="border px-3 py-2">{bill.paymentstatus}</td>
            <td className="border px-3 py-2">₹{bill.Balanceamount}</td>
            <td className="border px-3 py-2 text-center">
              {!isPaid && (
                <button
                  onClick={() => handlePayAmount(bill)}
                  className="bg-green-600 text-white px-2 py-1 text-xs rounded hover:bg-green-700"
                >
                  Pay Amount
                </button>
              )}
              {isPaid && <span className="text-green-700 font-semibold">✔</span>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payment Report</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">Full Payments</h2>
      {paidBills.length > 0 ? renderTable(paidBills, true) : <p>No full payments found.</p>}

      <h2 className="text-xl font-semibold mt-8 mb-2">Pending / Partial Payments</h2>
      {balanceBills.length > 0 ? renderTable(balanceBills, false) : <p>No balance payments found.</p>}
    </div>
  );
};

export default Report;
