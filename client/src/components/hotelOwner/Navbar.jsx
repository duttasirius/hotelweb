import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-400 py-3 bg-slate-300 transition-all duration-300">
      <Link>
        <img src={assets.logo} className="h-9 invert opacity-80" alt="" />
      </Link>

      <UserButton />
    </div>
  );
};

export default Navbar;
