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
      if (formData._id) {
        await axios.put(`http://localhost:5000/api/stocks/updateStock/${formData._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/stocks/createStock', formData);
      }

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
      console.error('Error saving stock:', err.response?.data?.message || err.message);
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
          onClick={() => {
            setFormData({
              item: '',
              totalStock: '',
              balanceStock: '',
              price: '',
              Manafactureringdate: '',
              experideDate: ''
            });
            setShowForm(true);
          }}
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
       <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-10">


          <div className="bg-gray-900 text-white border border-gray-700 p-6 w-full max-w-2xl rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-6">{formData._id ? 'Edit Stock' : 'Add New Stock'}</h3>
            <form onSubmit={handleAddStock} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Item Name</label>
                <input
                  name="item"
                  value={formData.item}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Urea"
                  className="bg-gray-800 border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Total Stock</label>
                <input
                  name="totalStock"
                  value={formData.totalStock}
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder="100"
                  className="bg-gray-800 border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Balance Stock</label>
                <input
                  name="balanceStock"
                  value={formData.balanceStock}
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder="80"
                  className="bg-gray-800 border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Price (₹)</label>
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder="₹100"
                  className="bg-gray-800 border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Manufacturing Date</label>
                <input
                  name="Manafactureringdate"
                  value={formData.Manafactureringdate}
                  onChange={handleChange}
                  required
                  type="date"
                  className="bg-gray-800 border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-semibold">Expiry Date</label>
                <input
                  name="experideDate"
                  value={formData.experideDate}
                  onChange={handleChange}
                  required
                  type="date"
                  className="bg-gray-800 border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2 flex justify-end mt-4 gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded"
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
