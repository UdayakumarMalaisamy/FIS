// frontend/src/pages/Stock.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    item: '',
    totalStock: '',
    balanceStock: '',
    price: '',
    Manafactureringdate: '',
    experideDate: ''
  });

  const fetchStocks = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/stocks/getAll');
      setStocks(res.data);
    } catch (err) {
      console.error('Error fetching stocks:', err);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddStock = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/stocks/createStock', formData);
      setShowForm(false);
      setFormData({
        item: '',
        totalStock: '',
        balanceStock: '',
        price: '',
        Manafactureringdate: '',
        experideDate: ''
      });
      fetchStocks();
    } catch (err) {
      console.error('Error adding stock:', err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (stock) => {
    setFormData({
      item: stock.item,
      totalStock: stock.totalStock,
      balanceStock: stock.balanceStock,
      price: stock.price,
      Manafactureringdate: stock.Manafactureringdate,
      experideDate: stock.experideDate
    });
    setShowForm(true);
  };
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stock?')) {
      try {
        await axios.delete(`http://localhost:5000/api/stocks/deleteStock/${id}`);
        fetchStocks();
      } catch (err) {
        console.error('Error deleting stock:', err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">Stock Management</h2>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          + Add Stock
        </button>
      </div>

      <table className="min-w-full border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Item</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Balance</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Mfg Date</th>
            <th className="border px-4 py-2">Exp Date</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{stock.item}</td>
              <td className="border px-4 py-2">{stock.totalStock}</td>
              <td className="border px-4 py-2">{stock.balanceStock}</td>
              <td className="border px-4 py-2">₹{stock.price}</td>
              <td className="border px-4 py-2">{new Date(stock.Manafactureringdate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{new Date(stock.experideDate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(stock._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(stock)}
                  className="text-blue-500 hover:underline ml-2"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Stock Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add New Stock</h3>
            <form onSubmit={handleAddStock} className="space-y-4">
              <input name="item" value={formData.item} onChange={handleChange} required placeholder="Item Name" className="w-full border px-3 py-2" />
              <input name="totalStock" value={formData.totalStock} onChange={handleChange} required type="number" placeholder="Total Stock" className="w-full border px-3 py-2" />
              <input name="balanceStock" value={formData.balanceStock} onChange={handleChange} required type="number" placeholder="Balance Stock" className="w-full border px-3 py-2" />
              <input name="price" value={formData.price} onChange={handleChange} required type="number" placeholder="Price" className="w-full border px-3 py-2" />
              <input name="Manafactureringdate" value={formData.Manafactureringdate} onChange={handleChange} required type="date" className="w-full border px-3 py-2" />
              <input name="experideDate" value={formData.experideDate} onChange={handleChange} required type="date" className="w-full border px-3 py-2" />

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-400 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stock;
