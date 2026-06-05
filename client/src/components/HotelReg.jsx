import React from "react";
import { assets, cities } from "../assets/assets";

const HotelReg = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      {/* can divide done by using grid grid-cols-[1fr_1fr] or md:w1/2 */}
      <form className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">
        {/* Left Image */}
        <div className="hidden md:block">
          <img
            src={assets.regImage}
            alt="Hotel Registration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="relative p-8 md:p-10">
          {/* Close Button */}
          <button
            type="button"
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 transition"
          >
            <img src={assets.closeIcon} alt="Close" className="w-5 h-5" />
          </button>

          <h2 className="text-3xl font-bold text-gray-900">
            Register Your Hotel
          </h2>

          <p className="text-gray-500 mt-2 mb-8">
            Join our platform and start receiving bookings from travelers
            worldwide.
          </p>

          <div className="space-y-5">
            {/* Hotel Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Hotel Name
              </label>

              <input
                id="name"
                type="text"
                placeholder="Enter hotel name"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>

              <input
                id="contact"
                type="tel"
                placeholder="Enter phone number"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Address
              </label>

              <input
                id="address"
                type="text"
                placeholder="Enter hotel address"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                City
              </label>

              <select
                id="city"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select City</option>

                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
            >
              Register Hotel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelReg;
