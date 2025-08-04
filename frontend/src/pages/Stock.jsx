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
    setFormData({ ...stock });
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
    <div className="p-4 font-sans text-white bg-gray-900 min-h-screen">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Stock Management</h2>
        <button
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={() => setShowForm(true)}
        >
          + Add Stock
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full border border-gray-700 text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              {['Item', 'Total', 'Balance', 'Price', 'Mfg Date', 'Exp Date', 'Action'].map((head) => (
                <th key={head} className="border border-gray-700 px-3 py-2">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock._id} className="hover:bg-gray-800">
                <td className="border border-gray-700 px-3 py-2">{stock.item}</td>
                <td className="border border-gray-700 px-3 py-2">{stock.totalStock}</td>
                <td className="border border-gray-700 px-3 py-2">{stock.balanceStock}</td>
                <td className="border border-gray-700 px-3 py-2">₹{stock.price}</td>
                <td className="border border-gray-700 px-3 py-2">{new Date(stock.Manafactureringdate).toLocaleDateString()}</td>
                <td className="border border-gray-700 px-3 py-2">{new Date(stock.experideDate).toLocaleDateString()}</td>
                <td className="border border-gray-700 px-3 py-2">
                  <select
                    onChange={(e) => {
                      const action = e.target.value;
                      if (action === 'delete') handleDelete(stock._id);
                      else if (action === 'edit') handleEdit(stock);
                    }}
                    className="bg-gray-800 border border-gray-700 text-white px-2 py-1 rounded"
                  >
                    <option value="">Action</option>
                    <option value="edit">Edit</option>
                    <option value="delete">Delete</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/60 z-50">
          <div className="bg-gray-800 text-white border border-gray-600 p-6 w-full max-w-md rounded-md">
            <h3 className="text-lg font-semibold mb-4">{formData._id ? 'Edit Stock' : 'Add New Stock'}</h3>
            <form onSubmit={handleAddStock} className="space-y-3">
              <input name="item" value={formData.item} onChange={handleChange} required placeholder="Item Name" className="w-full bg-gray-900 border border-gray-600 p-2 rounded" />
              <input name="totalStock" value={formData.totalStock} onChange={handleChange} required type="number" placeholder="Total Stock" className="w-full bg-gray-900 border border-gray-600 p-2 rounded" />
              <input name="balanceStock" value={formData.balanceStock} onChange={handleChange} required type="number" placeholder="Balance Stock" className="w-full bg-gray-900 border border-gray-600 p-2 rounded" />
              <input name="price" value={formData.price} onChange={handleChange} required type="number" placeholder="Price" className="w-full bg-gray-900 border border-gray-600 p-2 rounded" />
              <input name="Manafactureringdate" value={formData.Manafactureringdate} onChange={handleChange} required type="date" className="w-full bg-gray-900 border border-gray-600 p-2 rounded" />
              <input name="experideDate" value={formData.experideDate} onChange={handleChange} required type="date" className="w-full bg-gray-900 border border-gray-600 p-2 rounded" />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-red-700 hover:bg-red-600 px-4 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-600 px-4 py-1 rounded"
                >
                  {formData._id ? 'Update' : 'Add'}
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
