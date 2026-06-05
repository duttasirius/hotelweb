import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const SideBar = () => {
  return (
    <div className="md:w-64 w-16 border-r h-full border-gray-300 flex flex-col py-4 gap-2">
      <NavLink
        to="/owner"
        end
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-300
          ${
            isActive
              ? "bg-blue-500/20 text-blue-600 backdrop-blur-md shadow-lg shadow-blue-500/20"
              : "hover:bg-gray-100 text-gray-700"
          }`
        }
      >
        <img src={assets.dashboardIcon} alt="" className="w-5 h-5" />
        <span className="hidden md:block">Dashboard</span>
      </NavLink>

      <NavLink
        to="/owner/add-room"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-300
          ${
            isActive
              ? "bg-blue-500/20 text-blue-600 backdrop-blur-md shadow-lg shadow-blue-500/20"
              : "hover:bg-gray-100 text-gray-700"
          }`
        }
      >
        <img src={assets.addIcon} alt="" className="w-5 h-5" />
        <span className="hidden md:block">Add Room</span>
      </NavLink>

      <NavLink
        to="/owner/list-room"
        className={({ isActive }) =>
          `flex items-center gap-3 px-4 py-3 mx-2 rounded-xl transition-all duration-300
          ${
            isActive
              ? "bg-blue-500/20 text-blue-600 backdrop-blur-md shadow-lg shadow-blue-500/20"
              : "hover:bg-gray-100 text-gray-700"
          }`
        }
      >
        <img src={assets.listIcon} alt="" className="w-5 h-5" />
        <span className="hidden md:block">List Room</span>
      </NavLink>
    </div>
  );
};

export default SideBar;
