import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets, userBookingsDummyData } from "../assets/assets";
import { useAppContext } from "../context/AppContex";
import axios from "axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

const MyBookings = () => {
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

    rooms,
    setRooms,
  } = useAppContext();

  const [booking, setBooking] = useState([]);

  const fetchBooking = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/bookings/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setBooking(data.bookings);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div className="mt-20">
      <Title
        title={"MY BOOKING"}
        subTitle={
          "Keep track of your upcoming stays, completed bookings, and booking details."
        }
      />

      <div className="max-w-6xl mx-auto mt-10">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] gap-6 border-b border-gray-200 pb-4 mb-6 text-gray-600 font-medium">
          <p>Hotel</p>
          <p>Date & Time</p>
          <p>Payment</p>
        </div>

        {booking.map((booking) => (
          <div
            key={booking._id}
            className="grid md:grid-cols-[3fr_2fr_1fr] gap-6 bg-white border border-gray-200 rounded-3xl p-5 mb-5 shadow-sm hover:shadow-md transition"
          >
            {/* Hotel Info */}
            <div className="flex flex-col sm:flex-row gap-5">
              <img
                src={booking.room.images[0]}
                alt={booking.hotel.name}
                className="w-full sm:w-40 h-32 object-cover rounded-2xl"
              />

              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {booking.hotel.name}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({booking.room.roomType})
                  </span>
                </h3>

                <div className="flex items-center gap-2 text-gray-500">
                  <img src={assets.locationIcon} alt="" className="w-4 h-4" />
                  <span>{booking.hotel.address}</span>
                </div>

                <p className="text-lg font-semibold text-blue-600">
                  ${booking.totalPrice}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Check In</p>

                <p className="font-medium text-gray-900">
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Check Out</p>

                <p className="font-medium text-gray-900">
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Payment */}
            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    booking.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                />

                <p
                  className={`font-medium ${
                    booking.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {booking.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>

              {!booking.isPaid && (
                <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
