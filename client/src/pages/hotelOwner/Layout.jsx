import React, { useEffect } from "react";
import Navbar from "../../components/hotelOwner/Navbar";
import SideBar from "../../components/hotelOwner/SideBar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContex";

const Layout = () => {
  const { navigate, user, getToken, isOwner } = useAppContext();

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner]);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <SideBar />

        <div className="flex-1 p-4 pt-10 md:px-10 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
