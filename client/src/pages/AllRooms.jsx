import React, { useState } from "react";
import Title from "../components/Title";
import { assets, facilityIcons, roomsDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import StarRating from "../components/StarRating";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex items-center gap-3 cursor-pointer py-2">
    <input
      type="checkbox"
      checked={selected}
      onChange={(e) => onChange(e.target.checked, label)}
      className="w-4 h-4"
    />
    <span className="text-gray-600">{label}</span>
  </label>
);

const RadioButton = ({ label, selected = false, onChange = () => {} }) => (
  <label className="flex items-center gap-3 cursor-pointer py-2">
    <input
      type="radio"
      checked={selected}
      name="sortOption"
      onChange={() => onChange(label)}
      className="w-4 h-4"
    />
    <span className="text-gray-600">{label}</span>
  </label>
);

const AllRooms = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = ["Single Bed", "Double Bed", "Family Suite", "Luxury Room"];

  const priceRanges = ["0 - 500", "500 - 1000", "1000 - 2000", "2000 - 3000"];

  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  return (
    <div className=" mx-auto px-4 md:px-8 lg:px-12 py-10">
      <Title
        title="Explore Our Rooms"
        subTitle="Browse our collection of comfortable and carefully selected rooms. Whether you're traveling for business, leisure, or a family getaway, find the perfect stay with modern amenities and exceptional hospitality."
      />

      <div className="grid lg:grid-cols-[280px_1fr] gap-8 mt-10">
        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>

            <button
              onClick={() => setOpenFilters((prev) => !prev)}
              className="lg:hidden text-sm font-medium"
            >
              {openFilters ? "Hide" : "Show"}
            </button>
          </div>

          <div className={`${openFilters ? "block" : "hidden"} lg:block`}>
            <button className="text-sm text-blue-600 mt-3">Clear All</button>

            <div className="mt-6">
              <h3 className="font-medium mb-3">Popular Filters</h3>

              {roomTypes.map((room, index) => (
                <CheckBox key={index} label={room} />
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-3">Price Range</h3>

              {priceRanges.map((range, index) => (
                <CheckBox key={index} label={range} />
              ))}
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-3">Sort By</h3>

              {sortOptions.map((option, index) => (
                <RadioButton key={index} label={option} />
              ))}
            </div>
          </div>
        </div>

        {/* Rooms */}
        <div>
          {roomsDummyData.map((room) => (
            <div
              key={room._id}
              className="grid md:grid-cols-[2fr_3fr] gap-6 bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6 shadow-sm"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={room.images?.[0]}
                  alt={room.hotel.name}
                  onClick={() => navigate(`/rooms/${room._id}`)}
                  className="w-full h-full min-h-[260px] object-cover cursor-pointer hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500">{room.hotel.city}</p>

                  <h2
                    onClick={() => navigate(`/rooms/${room._id}`)}
                    className="text-2xl font-semibold mt-1 cursor-pointer hover:text-blue-600"
                  >
                    {room.hotel.name}
                  </h2>

                  <div className="flex items-center gap-3 mt-3">
                    <StarRating rating={4.5} />
                    <span className="text-sm text-gray-500">200+ Reviews</span>
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-gray-600">
                    <img src={assets.locationIcon} alt="" className="w-4 h-4" />
                    <span className="text-sm">{room.hotel.address}</span>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-5">
                    {room.amenities.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
                      >
                        <img
                          src={facilityIcons[item]}
                          alt=""
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <p className="text-3xl font-bold">
                    ${room.pricePerNight}
                    <span className="text-base font-normal text-gray-500">
                      /night
                    </span>
                  </p>

                  <button
                    onClick={() => navigate(`/rooms/${room._id}`)}
                    className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
