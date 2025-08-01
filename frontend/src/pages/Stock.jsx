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
      ...stock
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
    <div className="p-4 font-sans text-black">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold">Stock Management</h2>
        <button
          className="border border-black px-3 py-1"
          onClick={() => setShowForm(true)}
        >
          + Add Stock
        </button>
      </div>

      <table className="w-full border border-black text-sm">
        <thead>
          <tr>
            <th className="border border-black px-3 py-2">Item</th>
            <th className="border border-black px-3 py-2">Total</th>
            <th className="border border-black px-3 py-2">Balance</th>
            <th className="border border-black px-3 py-2">Price</th>
            <th className="border border-black px-3 py-2">Mfg Date</th>
            <th className="border border-black px-3 py-2">Exp Date</th>
            <th className="border border-black px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock._id}>
              <td className="border border-black px-3 py-2">{stock.item}</td>
              <td className="border border-black px-3 py-2">{stock.totalStock}</td>
              <td className="border border-black px-3 py-2">{stock.balanceStock}</td>
              <td className="border border-black px-3 py-2">₹{stock.price}</td>
              <td className="border border-black px-3 py-2">{new Date(stock.Manafactureringdate).toLocaleDateString()}</td>
              <td className="border border-black px-3 py-2">{new Date(stock.experideDate).toLocaleDateString()}</td>
              <td className="border border-black px-3 py-2">
                <select
                  onChange={(e) => {
                    const action = e.target.value;
                    if (action === 'delete') handleDelete(stock._id);
                    else if (action === 'edit') handleEdit(stock);
                  }}
                  className="border border-black px-2 py-1"
                >
                  <option value="">Select Action</option>
                  <option value="edit">Edit</option>
                  <option value="delete">Delete</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit Stock Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[2px] bg-opacity-90 z-50">
          <div className="bg-white border border-black p-4 w-full max-w-md">
            <h3 className="text-base font-semibold mb-2">Stock Form</h3>
            <form onSubmit={handleAddStock} className="space-y-2">
              <input name="item" value={formData.item} onChange={handleChange} required placeholder="Item Name" className="w-full border border-black p-1" />
              <input name="totalStock" value={formData.totalStock} onChange={handleChange} required type="number" placeholder="Total Stock" className="w-full border border-black p-1" />
              <input name="balanceStock" value={formData.balanceStock} onChange={handleChange} required type="number" placeholder="Balance Stock" className="w-full border border-black p-1" />
              <input name="price" value={formData.price} onChange={handleChange} required type="number" placeholder="Price" className="w-full border border-black p-1" />
              <input name="Manafactureringdate" value={formData.Manafactureringdate} onChange={handleChange} required type="date" className="w-full border border-black p-1" />
              <input name="experideDate" value={formData.experideDate} onChange={handleChange} required type="date" className="w-full border border-black p-1" />

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-1/4 border border-black px-2 py-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/4 border border-black px-2 py-1"
                >
                  {formData._id ? 'Update Stock' : 'Add Stock'}
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
