import { useState, useEffect } from "react";
import axios from "axios";

const Bill = () => {
  const [bills, setBills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    billno: "",
    costmername: "",
    contact: "",
    items: [{ item: "", quantity: "", price: "" }],
    tolalprice: "",
    paymentstatus: "",
    Balanceamount: "",
  });

  const fetchBills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bills/getAllBills");
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

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { item: "", quantity: "", price: "" }],
    }));
  };

  const removeItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: newItems }));
  };

  const handleAddBill = async (e) => {
    e.preventDefault();
    const total = formData.items.reduce((acc, item) => {
      const qty = parseFloat(item.quantity) || 0;
      const prc = parseFloat(item.price) || 0;
      return acc + qty * prc;
    }, 0);

    try {
      const payload = {
        ...formData,
        tolalprice: total,
        Balanceamount: parseFloat(formData.Balanceamount || 0),
      };
      await axios.post("http://localhost:5000/api/bills/createBill", payload);
      setShowForm(false);
      setFormData({
        billno: "",
        costmername: "",
        contact: "",
        items: [{ item: "", quantity: "", price: "" }],
        tolalprice: "",
        paymentstatus: "",
        Balanceamount: "",
      });
      fetchBills();
    } catch (err) {
      console.error("Error adding bill:", err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (bill) => {
    setFormData({
      billno: bill.billno,
      costmername: bill.costmername,
      contact: bill.contact,
      items: bill.items || [{ item: "", quantity: "", price: "" }],
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
      console.error("Error deleting bill:", err.response?.data?.message || err.message);
    }
  };

  // Bill download function
  const downloadBill = (bill) => {
    const billContent = generateBillHTML(bill);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    printWindow.document.write(billContent);
    printWindow.document.close();
    
    // Wait for content to load, then print
    printWindow.onload = () => {
      printWindow.print();
      // Close the window after printing (optional)
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    };
  };

  // Generate HTML content for the bill
  const generateBillHTML = (bill) => {
    const currentDate = new Date().toLocaleDateString();
    const itemsHTML = bill.items.map((item, index) => `
      <tr>
        <td style="border: 1px solid #ddd; padding: 8px;">${index + 1}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">${item.item}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${parseFloat(item.price).toFixed(2)}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">₹${(parseFloat(item.quantity) * parseFloat(item.price)).toFixed(2)}</td>
      </tr>
    `).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Bill #${bill.billno}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
          }
          .company-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
          }
          .bill-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .customer-info, .bill-details {
            flex: 1;
          }
          .bill-details {
            text-align: right;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          th {
            background-color: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }
          .total-section {
            margin-top: 20px;
            text-align: right;
          }
          .total-row {
            margin: 5px 0;
            font-size: 16px;
          }
          .grand-total {
            font-size: 18px;
            font-weight: bold;
            border-top: 2px solid #333;
            padding-top: 10px;
            margin-top: 10px;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #666;
          }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name"></div>
          <div>Address Line 1, Address Line 2</div>
          <div>Phone: +91 XXXXXXXXXX | Email: info@company.com</div>
        </div>

        <div class="bill-info">
          <div class="customer-info">
            <h3>Bill To:</h3>
            <strong>${bill.costmername}</strong><br>
            Contact: ${bill.contact}
          </div>
          <div class="bill-details">
            <h3>Bill Details:</h3>
            <strong>Bill No:</strong> ${bill.billno}<br>
            <strong>Date:</strong> ${currentDate}<br>
            <strong>Payment Status:</strong> ${bill.paymentstatus}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Item Description</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHTML}
          </tbody>
        </table>

        <div class="total-section">
          <div class="total-row">
            <strong>Total Amount: ₹${parseFloat(bill.tolalprice).toFixed(2)}</strong>
          </div>
          ${bill.paymentstatus !== 'Paid' ? `
            <div class="total-row">
              Balance Amount: ₹${parseFloat(bill.Balanceamount).toFixed(2)}
            </div>
          ` : ''}
          <div class="grand-total">
            Grand Total: ₹${parseFloat(bill.tolalprice).toFixed(2)}
          </div>
        </div>

        <div class="footer">
          <p>Thank you for your business!</p>
          <p>This is a computer generated bill.</p>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Bills</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 border rounded border-white"
        >
          {showForm ? "Hide Form" : "Add Bill"}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add Bill</h2>
            <form onSubmit={handleAddBill} className="space-y-4">
              <input
                type="text"
                name="costmername"
                placeholder="Customer Name"
                value={formData.costmername}
                onChange={handleChange}
                className="border p-2 w-full bg-gray-700 text-white"
                required
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleChange}
                className="border p-2 w-full bg-gray-700 text-white"
                required
              />
              <div className="space-y-2">
                {formData.items.map((itm, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Item"
                      value={itm.item}
                      onChange={(e) => handleItemChange(index, "item", e.target.value)}
                      className="border p-2 w-full bg-gray-700 text-white"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Qty"
                      value={itm.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      className="border p-2 w-full bg-gray-700 text-white"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Price"
                      value={itm.price}
                      onChange={(e) => handleItemChange(index, "price", e.target.value)}
                      className="border p-2 w-full bg-gray-700 text-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-red-400"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addItem}
                  className="text-sm text-blue-400 underline"
                >
                  + Add Item
                </button>
              </div>
              <select
                name="paymentstatus"
                value={formData.paymentstatus}
                onChange={handleChange}
                className="border p-2 w-full bg-gray-700 text-white"
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
                  className="border p-2 w-full bg-gray-700 text-white"
                />
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border px-4 py-2 rounded border-white"
                >
                  Cancel
                </button>
                <button type="submit" className="border px-4 py-2 rounded border-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="min-w-full border-collapse text-white mt-6">
        <thead>
          <tr>
            <th className="border px-3 py-2">Bill No</th>
            <th className="border px-3 py-2">Customer</th>
            <th className="border px-3 py-2">Contact</th>
            <th className="border px-3 py-2">Items</th>
            <th className="border px-3 py-2">Total</th>
            <th className="border px-3 py-2">Payment</th>
            <th className="border px-3 py-2">Balance</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id} className="hover:bg-gray-800">
              <td className="border border-gray-700 px-3 py-2 text-white">{bill.billno}</td>
              <td className="border border-gray-700 px-3 py-2 text-white">{bill.costmername}</td>
              <td className="border border-gray-700 px-3 py-2 text-white">{bill.contact}</td>
              <td className="border border-gray-700 px-3 py-2 text-white">
                {bill.items.map((item, index) => (
                  <div key={index}>
                    {item.item} - {item.quantity} x ₹{item.price}
                  </div>
                ))}
              </td>
              <td className="border border-gray-700 px-3 py-2 text-white">₹{bill.tolalprice}</td>
              <td className="border border-gray-700 px-3 py-2 text-white">{bill.paymentstatus}</td>
              <td className="border border-gray-700 px-3 py-2 text-white">₹{bill.Balanceamount}</td>
              <td className="border border-gray-700 px-3 py-2 text-center">
                <div className="flex gap-2 justify-center">
                  <select
                    onChange={(e) => {
                      const action = e.target.value;
                      if (action === "edit") handleEdit(bill);
                      else if (action === "delete") handleDelete(bill._id);
                      e.target.value = ""; // Reset select
                    }}
                    defaultValue=""
                    className="border rounded px-2 py-1 text-sm bg-gray-700 text-white"
                  >
                    <option value="" disabled>
                      Action
                    </option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                  </select>
                  <button
                    onClick={() => downloadBill(bill)}
                    className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                    title="Download Bill"
                  >
                    📄
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bill;