import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockBill = () => {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [billItems, setBillItems] = useState([]);
  const [total, setTotal] = useState(0);

  // ✅ Fetch all fertilizers from backend
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stocks/getAll');
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    fetchStocks();
  }, []);

  // ✅ Add selected fertilizer to bill
  const addToBill = () => {
    const stock = stocks.find(s => s._id === selectedStock);
    if (!stock || quantity <= 0) return;

    const existingIndex = billItems.findIndex(item => item.id === stock._id);
    const updatedItems = [...billItems];
    let updatedTotal = total;

    if (existingIndex !== -1) {
      // Update existing item
      const existingItem = updatedItems[existingIndex];
      const newQty = existingItem.quantity + quantity;
      const newSubtotal = newQty * stock.price;

      updatedItems[existingIndex] = {
        ...existingItem,
        quantity: newQty,
        subtotal: newSubtotal
      };

      updatedTotal = total - existingItem.subtotal + newSubtotal;
    } else {
      // Add new item
      const newItem = {
        id: stock._id,
        name: stock.item,
        price: stock.price,
        quantity: quantity,
        subtotal: stock.price * quantity
      };
      updatedItems.push(newItem);
      updatedTotal += newItem.subtotal;
    }

    setBillItems(updatedItems);
    setTotal(updatedTotal);
    setSelectedStock('');
    setQuantity(1);
  };

  // ✅ Submit bill
  const createBill = async () => {
    if (billItems.length === 0) {
      alert('Please add items to the bill');
      return;
    }

    const billData = {
      items: billItems,
      total,
      date: new Date().toISOString()
    };

    try {
      // Optional: POST to your backend if you want to save the bill
      // await axios.post('http://localhost:5000/api/bills', billData);

      console.log('Bill submitted:', billData);
      alert('✅ Bill created successfully!');

      setBillItems([]);
      setTotal(0);
    } catch (error) {
      console.error('Error creating bill:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🧾 Create Fertilizer Bill</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Fertilizer Dropdown */}
        <div className="flex-1">
          <label className="block mb-1 text-gray-700 font-medium">Fertilizer</label>
          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Fertilizer</option>
            {stocks.map(stock => (
              <option key={stock._id} value={stock._id}>
                {stock.item} - ₹{stock.price}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div className="w-32">
          <label className="block mb-1 text-gray-700 font-medium">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            min="1"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Add Button */}
        <button
          onClick={addToBill}
          disabled={!selectedStock || quantity <= 0}
          className="self-end bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          ➕ Add to Bill
        </button>
      </div>

      {/* Bill Items Table */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Bill Items</h3>
        {billItems.length > 0 ? (
          <>
            <table className="w-full table-auto border border-gray-200 mb-4">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-2 text-left">Item</th>
                  <th className="p-2 text-right">Price (₹)</th>
                  <th className="p-2 text-right">Qty</th>
                  <th className="p-2 text-right">Subtotal (₹)</th>
                </tr>
              </thead>
              <tbody>
                {billItems.map((item, index) => (
                  <tr key={index} className="border-t border-gray-100">
                    <td className="p-2">{item.name}</td>
                    <td className="p-2 text-right">{item.price}</td>
                    <td className="p-2 text-right">{item.quantity}</td>
                    <td className="p-2 text-right">{item.subtotal.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right text-lg font-semibold text-gray-800 mb-4">
              Total: ₹{total.toFixed(2)}
            </div>

            <button
              onClick={createBill}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              ✅ Create Bill
            </button>
          </>
        ) : (
          <p className="text-gray-500">No fertilizers added yet.</p>
        )}
      </div>
    </div>
  );
};

export default StockBill;
