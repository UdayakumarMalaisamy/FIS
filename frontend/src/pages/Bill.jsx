import React, { useState } from 'react';
import axios from 'axios';

const CreateBillForm = () => {
  const [formData, setFormData] = useState({
    costmername: '',
    contact: '',
    item: '',
    quantity: 1,
    tolalprice: 0,
    paymentstatus: 'Paid',
    Balanceamount: 0
  });

  const [submittedBill, setSubmittedBill] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['quantity', 'tolalprice', 'Balanceamount'].includes(name)
        ? Number(value)
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post to backend
      const response = await axios.post('http://localhost:5000/api/bills/createBill', formData);
      
      // Save to display below
      setSubmittedBill(formData);

      // Reset form
      setFormData({
        costmername: '',
        contact: '',
        item: '',
        quantity: 1,
        tolalprice: 0,
        paymentstatus: 'Paid',
        Balanceamount: 0
      });

      alert('✅ Bill successfully submitted!');
    } catch (error) {
      console.error('Error submitting bill:', error);
      alert('❌ Failed to submit bill');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-4">🧾 Customer Bill Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="costmername"
          placeholder="Customer Name"
          value={formData.costmername}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="item"
          placeholder="Item Name"
          value={formData.item}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          min="1"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="number"
          name="tolalprice"
          placeholder="Total Price"
          value={formData.tolalprice}
          onChange={handleChange}
          min="0"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <select
          name="paymentstatus"
          value={formData.paymentstatus}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Partial">Partial</option>
        </select>

        <input
          type="number"
          name="Balanceamount"
          placeholder="Balance Amount"
          value={formData.Balanceamount}
          onChange={handleChange}
          min="0"
          className="w-full p-2 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          ✅ Submit Bill
        </button>
      </form>

      {/* Show Bill Details After Submit */}
      {submittedBill && (
        <div className="mt-8 bg-gray-50 p-4 border rounded shadow">
          <h3 className="text-lg font-semibold mb-2 text-green-800">🧾 Submitted Bill Details</h3>
          <ul className="text-gray-700 space-y-1">
            <li><strong>Customer:</strong> {submittedBill.costmername}</li>
            <li><strong>Contact:</strong> {submittedBill.contact}</li>
            <li><strong>Item:</strong> {submittedBill.item}</li>
            <li><strong>Quantity:</strong> {submittedBill.quantity}</li>
            <li><strong>Total Price:</strong> ₹{submittedBill.tolalprice}</li>
            <li><strong>Payment Status:</strong> {submittedBill.paymentstatus}</li>
            <li><strong>Balance:</strong> ₹{submittedBill.Balanceamount}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateBillForm;
