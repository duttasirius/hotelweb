import React, { useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContex";
import toast from "react-hot-toast";

const HotelReg = () => {
  const { setShowHotelReg, getToken, isOwner, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const token = await getToken();

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/hotels`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, address, contact, city }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to register hotel");
      }

      toast.success(data.message);
      setIsOwner(true);
      setShowHotelReg(false);
    } catch (error) {
      console.error("REGISTER HOTEL ERROR:", error);
      toast.error(error.message || "Unable to register hotel");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <form
        onSubmit={onSubmitHandler}
        className="relative grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2"
      >
        <div className="hidden md:block">
          <img
            src={assets.regImage}
            alt="Hotel registration"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative p-6 sm:p-8 md:p-10">
          <button
            type="button"
            onClick={() => setShowHotelReg(false)}
            className="absolute right-4 top-4 rounded-full p-2 transition hover:bg-gray-100"
            aria-label="Close hotel registration"
          >
            <img src={assets.closeIcon} alt="" className="h-5 w-5" />
          </button>

          <h2 className="text-3xl font-bold text-gray-900">Register Your Hotel</h2>
          <p className="mt-2 mb-8 text-gray-500">
            Join QuickStay and start managing your hotel inventory and bookings.
          </p>

          <div className="space-y-5">
            <div>
              <label htmlFor="hotel-name" className="mb-2 block text-sm font-medium text-gray-700">
                Hotel Name
              </label>
              <input
                id="hotel-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                required
                placeholder="Enter hotel name"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label htmlFor="hotel-contact" className="mb-2 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                id="hotel-contact"
                value={contact}
                onChange={(event) => setContact(event.target.value)}
                type="tel"
                required
                placeholder="Enter phone number"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label htmlFor="hotel-address" className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                id="hotel-address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                type="text"
                required
                placeholder="Enter hotel address"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label htmlFor="hotel-city" className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>
              <select
                id="hotel-city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              >
                <option value="">Select City</option>
                {cities.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Registering..." : "Register Hotel"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
