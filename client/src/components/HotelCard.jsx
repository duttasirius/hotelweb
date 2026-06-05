import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HotelCard = ({ room, index }) => {
  return (
    <Link
      key={index}
      to={"/rooms/" + room._id}
      onClick={() => scrollTo(0, 0)}
      className="group block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={room.images[0]}
          alt={room.hotel.name}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <p className="absolute top-4 left-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
          Best Seller
        </p>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Hotel Name & Rating */}
        <div className="mb-3 flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-800">
            {room.hotel.name}
          </p>

          <div className="flex items-center gap-1">
            <img src={assets.starIconFilled} alt="" className="w-4 h-4" />
            <span className="text-sm font-medium text-gray-600">4.5</span>
          </div>
        </div>

        {/* Location */}
        <div className="mb-4 flex items-center gap-2 text-gray-500">
          <img src={assets.locationIcon} alt="" className="w-4 h-4" />
          <span className="truncate text-sm">{room.hotel.address}</span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between border-t pt-4">
          <p className="text-gray-700">
            <span className="text-2xl font-bold text-blue-600">
              ₹{room.pricePerNight}
            </span>
            <span className="ml-1 text-sm text-gray-500">/ Night</span>
          </p>

          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
            Book Now
          </button>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
