import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import navdata from '../helper/navData';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/'); 
  };

  return (
    <div className={`bg-gray-800 text-white h-screen flex flex-col justify-between ${isOpen ? 'w-65 ' : 'w-16'} transition-all duration-800`}>
      <div>
        <div className="flex items-center justify-between p-4">
          {isOpen && <h2 className="text-2xl font-bold">Fertilizer <br /> <h3 className="text-sm">Management System</h3></h2>}
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

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 w-full text-left rounded-md hover:bg-gray-700 transition-colors-500"
        >
       
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;