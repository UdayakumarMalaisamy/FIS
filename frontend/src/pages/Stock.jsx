import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Stock = () => {
  const [fertilizers, setFertilizers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFertilizers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/fertilizers');
        setFertilizers(response.data);
      } catch (error) {
        console.error('Error fetching fertilizers:', error);
      }
    };

    fetchFertilizers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Fertilizer Stock</h1>
        <button
          onClick={() => navigate('/add-fertilizer')}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
        >
          Add Fertilizer
        </button>
      </div>

      {fertilizers.length === 0 ? (
        <p className="text-gray-500">No fertilizer stock available.</p>
      ) : (
        <ul className="space-y-3">
          {fertilizers.map((fertilizer) => (
            <li
              key={fertilizer._id || fertilizer.id}
              className="bg-white shadow-md p-4 rounded-md border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-lg text-gray-700">{fertilizer.name}</p>
                  <p className="text-sm text-gray-500">Quantity: {fertilizer.quantity}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Stock;

