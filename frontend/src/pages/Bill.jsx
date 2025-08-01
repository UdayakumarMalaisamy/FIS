import { useState, useEffect } from "react";
import axios from "axios";


const Bill = () => {
  const [bills, setBills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    billno: "",
    costmername: "",
    contact: "",
    item: "",
    quantity: "",
    tolalprice: "",
    paymentstatus: "",
    Balanceamount: "",
  });

  const fetchBills = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bills/getAllBills"
      );
      setBills(res.data);
    } catch (err) {
      console.error("Error fetching bills:", err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddBill = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        quantity: parseInt(formData.quantity),
        tolalprice: parseFloat(formData.tolalprice),
        Balanceamount: parseFloat(formData.Balanceamount),
      };

      await axios.post("http://localhost:5000/api/bills/createBill", payload);
      setShowForm(false);
      setFormData({
        billno: "",
        costmername: "",
        contact: "",
        item: "",
        quantity: "",
        tolalprice: "",
        paymentstatus: "",
        Balanceamount: "",
      });
      fetchBills();
    } catch (err) {
      console.error(
        "Error adding bill:",
        err.response?.data?.message || err.message
      );
    }
  };

  const handleEdit = (bill) => {
    setFormData({
      billno: bill.billno,
      costmername: bill.costmername,
      contact: bill.contact,
      item: bill.item,
      quantity: bill.quantity,
      tolalprice: bill.tolalprice,
      paymentstatus: bill.paymentstatus,
      Balanceamount: bill.Balanceamount,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bills/deleteBill/${id}`);
      fetchBills();
    } catch (err) {
      console.error(
        "Error deleting bill:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Bills</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 border rounded"
        >
          {showForm ? "Hide Form" : "Add Bill"}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Bill</h2>
            <form onSubmit={handleAddBill} className="space-y-4">
               <input
                type="text"
                name="billno"
                placeholder="Bill Number"
                value={formData.billno}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              /> 
              <input
                type="text"
                name="costmername"
                placeholder="Customer Name"
                value={formData.costmername}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="text"
                name="item"
                placeholder="Item"
                value={formData.item}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
              <input
                type="number"
                name="tolalprice"
                placeholder="Total Price"
                value={formData.tolalprice}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              />
              <select
                name="paymentstatus"
                value={formData.paymentstatus}
                onChange={handleChange}
                className="border p-2 w-full"
                required
              >
                <option value="">Select Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Partial">Partial</option>
                <option value="Unpaid">Unpaid</option>
              </select>
              {formData.paymentstatus !== "Paid" && (
                <input
                  type="number"
                  name="Balanceamount"
                  placeholder="Balance Amount"
                  value={formData.Balanceamount}
                  onChange={handleChange}
                  className="border p-2 w-full"
                />
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="border px-4 py-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-3 py-2">Bill Number</th>
            <th className="border px-3 py-2">Customer Name</th>
            <th className="border px-3 py-2">Contact</th>
            <th className="border px-3 py-2">Item</th>
            <th className="border px-3 py-2">Quantity</th>
            <th className="border px-3 py-2">Total</th>
            <th className="border px-3 py-2">Payment</th>
            <th className="border px-3 py-2">Balance</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              <td className="border px-3 py-2">{bill.billno}</td>
              <td className="border px-3 py-2">{bill.costmername}</td>
              <td className="border px-3 py-2">{bill.contact}</td>
              <td className="border px-3 py-2">{bill.item}</td>
              <td className="border px-3 py-2">{bill.quantity}</td>
              <td className="border px-3 py-2">₹{bill.tolalprice}</td>
              <td className="border px-3 py-2">{bill.paymentstatus}</td>
              <td className="border px-3 py-2">₹{bill.Balanceamount}</td>
              <td className="border px-3 py-2">
                <select
                  onChange={(e) => {
                    const action = e.target.value;
                    if (action === "edit") handleEdit(bill);
                    else if (action === "delete") handleDelete(bill._id);
                  }}
                  defaultValue=""
                  className="border rounded px-2 py-1 text-sm"
                >
                  <option value="" disabled>
                    Action
                  </option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bill;
