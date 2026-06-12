import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import { useAppContext } from "../../context/AppContex";
import axios from "axios";
import { assets } from "../../assets/assets";

// import { assets, dashboardDummyData } from "../../assets/assets";

// table = container
// tr    = row
// th    = heading
// td    = data

// table
//  └─ tr
//      ├─ th / td
//      └─ th / td

const DashBoard = () => {
  const {
    navigate,
    user,
    getToken,
    isOwner,
    setIsOwner,
    showHotelReg,
    setShowHotelReg,
    searchedCities,
    setSearchedCities,
  } = useAppContext();

  const [dashBoardData, setDashboardData] = useState({
    bookings: [],
    totalBookings: 0,
    totalRevenue: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/bookings/hotel", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setDashboardData(data.dashBoardData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div>
      <Title
        title={"Hotel Management Dashboard"}
        subTitle={
          "Monitor bookings, room availability, guest activity, and revenue from one place. Quickly manage rooms, track performance, and keep your hotel operations organized with real-time insights and updates."
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-xl gap-6 my-8">
        {/* Total Bookings */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <img
              src={assets.totalBookingIcon}
              alt="Bookings"
              className="w-8 h-8"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Bookings</p>
            <h3 className="text-2xl font-bold text-gray-800">
              {dashBoardData.totalBookings}
            </h3>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <img
              src={assets.totalRevenueIcon}
              alt="Revenue"
              className="w-8 h-8"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Revenue</p>
            <h3 className="text-2xl font-bold text-gray-800">
              ₹{dashBoardData.totalRevenue}
            </h3>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white border border-gray-200 rounded-xl px-5 shadow-sm overflow-hidden max-w-5xl">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-blue-500 text-center">
            Recent Bookings
          </h2>
        </div>

        <div className="overflow-x-auto">
          {/* HEADER SECTION DETAILS HERE  */}
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              {/* <tr> Table Row */}
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  User Name
                </th>

                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Room Name
                </th>

                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Total Amount
                </th>

                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Payment Status
                </th>
              </tr>
            </thead>

            {/* TABLE BODY SECTION data goes here  */}
            <tbody>
              {dashBoardData.bookings.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 text-gray-700">
                    {item.user.username}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {item.room.roomType}
                  </td>

                  <td className="px-6 py-4 font-medium text-gray-800">
                    ₹{item.totalPrice}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        item.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isPaid ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
