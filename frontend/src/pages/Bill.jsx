import { useState, useEffect } from "react";
import axios from "axios";

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
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
    <h1 className="text-2xl font-bold">Bills</h1>
    <button
      onClick={() => setShowForm(!showForm)}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {showForm ? "Hide Form" : "Add Bill"}
    </button>
  </div>


      {showForm && (
        <form onSubmit={handleAddBill} className="mb-4">
          <input
            type="text"
            name="costmername"
            placeholder="Customer Name"
            value={formData.costmername}
            onChange={handleChange}
            className="border p-2 mr-2"
            required
          />
          <br />
          <input
            type="text"
            name="contact"
            placeholder="Contact"
            value={formData.contact}
            onChange={handleChange}
            className="border p-2 mr-2"
            required
          />
          <br />
          <input
            type="text"
            name="item"
            placeholder="Item"
            value={formData.item}
            onChange={handleChange}
            className="border p-2 mr-2"
            required
          />
          <br />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2 mr-2"
            required
          />
          <br />
          <input
            type="number"
            name="tolalprice"
            placeholder="Total Price"
            value={formData.tolalprice}
            onChange={handleChange}
            className="border p-2 mr-2"
            required
          />
          <br />
          <select
            name="paymentstatus"
            value={formData.paymentstatus}
            onChange={handleChange}
            className="border p-2 mr-2"
            required
          >
            <option value="">Select Payment Status</option>
            <option value="Paid">Paid</option>
            <option value="Partial">Partial</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          <br />
          {formData.paymentstatus !== "Paid" && (
            <input
              type="number"
              name="Balanceamount"
              placeholder="Balance Amount"
              value={formData.Balanceamount}
              onChange={handleChange}
              className="border p-2 mr-2"
            />
          
          )}
          <br />
       
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Customer Name</th>
            <th className="py-2 px-4 border">Contact</th>
            <th className="py-2 px-4 border">Item</th>
            <th className="py-2 px-4 border">Quantity</th>
            <th className="py-2 px-4 border">Total</th>
            <th className="py-2 px-4 border">Payment</th>
            <th className="py-2 px-4 border">Balance</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              <td className="py-2 px-4 border">{bill.costmername}</td>
              <td className="py-2 px-4 border">{bill.contact}</td>
              <td className="py-2 px-4 border">{bill.item}</td>
              <td className="py-2 px-4 border">{bill.quantity}</td>
              <td className="py-2 px-4 border">₹{bill.tolalprice}</td>
              <td className="py-2 px-4 border">{bill.paymentstatus}</td>
              <td className="py-2 px-4 border">₹{bill.Balanceamount}</td>
              <td className="py-2 px-4 border">
    
              
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleDelete(bill._id)}
                  className="text-red-500 hover:underline mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(bill)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                </td> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bill;
