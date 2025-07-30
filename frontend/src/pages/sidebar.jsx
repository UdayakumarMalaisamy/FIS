import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import navdata from '../helper/navData';
import { FaBars } from 'react-icons/fa'; // Hamburger icon

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`bg-gray-800 text-white h-screen ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
      <div className="flex items-center justify-between p-4">
        {isOpen && <h2 className="text-2xl font-bold">Fertilizer</h2>}
        <button onClick={toggleSidebar} className="text-white">
          <FaBars />
        </button>
      </div>

      <ul className="space-y-2 mt-6">
        {navdata.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`
              }
            >
              <item.icon className="text-lg" />
              {isOpen && <span className="text-sm font-medium">{item.title}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
