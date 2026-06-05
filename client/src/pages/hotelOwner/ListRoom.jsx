import React, { useState } from "react";
import { roomsDummyData } from "../../assets/assets";
import Title from "../../components/Title";

const ListRoom = () => {
  const [rooms, setRooms] = useState(roomsDummyData);

  return (
    <div className="mt-6 overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200 ">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-4 font-semibold">Name</th>
            <th className="px-6 py-4 font-semibold">Facility</th>
            <th className="px-6 py-4 font-semibold">Price / Night</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((item, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4 font-medium text-gray-800">
                {item.roomType}
              </td>

              <td className="px-6 py-4 text-gray-600">
                {item.amenities.join(", ")}
              </td>

              <td className="px-6 py-4 font-semibold text-indigo-600">
                ₹{item.pricePerNight}
              </td>

              <td className="px-6 py-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={item.isAvailable}
                      onChange={() => handleToggle(item._id)}
                    />

                    <div className="w-12 h-7 rounded-full bg-gray-300 peer-checked:bg-green-500 transition-colors"></div>

                    <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>

                  <span
                    className={`font-medium ${
                      item.isAvailable ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListRoom;
