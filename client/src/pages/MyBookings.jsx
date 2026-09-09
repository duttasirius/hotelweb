import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContex";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { user, getToken } = useAuth();
  const [booking, setBooking] = useState([]);

  const fetchBooking = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/bookings/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setBooking(data.bookings);
      }
    } catch (error) {
      console.error("BOOKINGS ERROR:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const handlePayment = async (bookingId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/pay/razorpay",
        { bookingId },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      const order = data.order;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "QuickStay",
        description: "Hotel Booking",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              "/api/pay/verify-payment",
              {
                bookingId,
                razorpay_order_id: response.razorpay_order_id,
              },
              { headers: { Authorization: `Bearer ${token}` } },
            );

            if (verifyResponse.data.success) {
              toast.success("Payment Successful");
              fetchBooking();
            } else {
              toast.error("Payment Verification Failed");
            }
          } catch (error) {
            console.error(error);
            toast.error("Verification Failed");
          }
        },
        prefill: {
          name: user?.username || "",
          email: user?.email || "",
        },
        theme: { color: "#2563eb" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("PAYMENT ERROR:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="mt-20 px-4 pb-20">
      <Title
        title="MY BOOKINGS"
        subTitle="Keep track of your upcoming stays, completed bookings, and booking details."
      />

      <div className="mx-auto mt-10 max-w-6xl">
        <div className="mb-6 hidden border-b border-gray-200 pb-4 font-medium text-gray-600 md:grid md:grid-cols-[3fr_2fr_1fr] md:gap-6">
          <p>Hotel</p>
          <p>Date & Time</p>
          <p>Payment</p>
        </div>

        {booking.map((item) => (
          <div
            key={item._id}
            className="mb-5 grid gap-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md md:grid-cols-[3fr_2fr_1fr]"
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              <img
                src={item.room.images[0]}
                alt={item.hotel.name}
                className="h-32 w-full rounded-2xl object-cover sm:w-40"
              />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                  {item.hotel.name}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({item.room.roomType})
                  </span>
                </h3>
                <div className="flex items-center gap-2 text-gray-500">
                  <img src={assets.locationIcon} alt="" className="h-4 w-4" />
                  <span>{item.hotel.address}</span>
                </div>
                <p className="text-lg font-semibold text-blue-600">
                  ₹{item.totalPrice}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Check In</p>
                <p className="font-medium text-gray-900">
                  {new Date(item.checkInDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Check Out</p>
                <p className="font-medium text-gray-900">
                  {new Date(item.checkOutDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`h-3 w-3 rounded-full ${
                    item.isPaid ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <p
                  className={`font-medium ${
                    item.isPaid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>

              {!item.isPaid && (
                <button
                  onClick={() => handlePayment(item._id)}
                  className="rounded-xl bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        ))}

        {!booking.length && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
            No bookings yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
