import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 shadow-sm md:px-8">
      <Link to="/">
        <img src={assets.logo} className="h-9" alt="QuickStay" />
      </Link>

      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden items-center gap-2 sm:flex">
            <img
              src={user.image}
              alt={user.username}
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="max-w-36 truncate text-sm font-semibold text-gray-800">
              {user.username}
            </span>
          </div>
        )}
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
