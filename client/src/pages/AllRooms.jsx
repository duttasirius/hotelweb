import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import { assets, facilityIcons } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContex";

const AllRooms = () => {
  const { navigate, axios, rooms } = useAppContext();

  const [openFilters, setOpenFilters] = useState(false);
  const [filterRooms, setFilterRooms] = useState([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const priceRanges = [
    { label: "0 - 1000", min: 0, max: 1000 },
    { label: "1000 - 3000", min: 1000, max: 3000 },
    { label: "3000 - 5000", min: 3000, max: 5000 },
    { label: "5000 - 7500", min: 5000, max: 7500 },
    { label: "7500+", min: 7500, max: Infinity },
  ];

  const toggleRoomType = (e) => {
    if (selectedRoomTypes.includes(e.target.value)) {
      setSelectedRoomTypes((prev) =>
        prev.filter((item) => item !== e.target.value),
      );
    } else {
      setSelectedRoomTypes((prev) => [...prev, e.target.value]);
    }
  };

  const togglePriceRange = (e) => {
    if (selectedPriceRanges.includes(e.target.value)) {
      setSelectedPriceRanges((prev) =>
        prev.filter((item) => item !== e.target.value),
      );
    } else {
      setSelectedPriceRanges((prev) => [...prev, e.target.value]);
    }
  };

  const clearAllFilters = () => {
    setSelectedRoomTypes([]);
    setSelectedPriceRanges([]);
    setSortType("relevant");
  };

  const applyFilter = () => {
    let copy = Array.isArray(rooms) ? [...rooms] : [];

    if (selectedRoomTypes.length > 0) {
      copy = copy.filter((room) =>
        selectedRoomTypes.includes(room.roomType),
      );
    }

    if (selectedPriceRanges.length > 0) {
      copy = copy.filter((room) =>
        selectedPriceRanges.some((label) => {
          const range = priceRanges.find((item) => item.label === label);

          return (
            range &&
            room.pricePerNight >= range.min &&
            room.pricePerNight <= range.max
          );
        }),
      );
    }

    if (sortType === "Price Low to High") {
      copy.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortType === "Price High to Low") {
      copy.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortType === "Newest First") {
      copy.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }

    setFilterRooms(copy);
  };

  useEffect(() => {
    applyFilter();
  }, [
    rooms,
    selectedRoomTypes,
    selectedPriceRanges,
    sortType,
  ]);

  return (
    <div className="mx-auto px-4 md:px-8 lg:px-12 py-10">
      <Title
        title="Explore Our Rooms"
        subTitle="Browse our collection of comfortable and carefully selected rooms. Whether you're traveling for business, leisure, or a family getaway, find the perfect stay with modern amenities and exceptional hospitality."
      />

      <div className="grid lg:grid-cols-[280px_1fr] gap-8 mt-10">
        {/* LEFT: Filters */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 h-fit lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <p
              onClick={() => setOpenFilters((prev) => !prev)}
              className="text-lg font-semibold flex items-center gap-2 cursor-pointer"
            >
              FILTERS
              <img
                src={assets.dropdown_icon}
                className={`h-3 transition-transform duration-300 lg:hidden ${
                  openFilters ? "rotate-90" : ""
                }`}
                alt=""
              />
            </p>

            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className={`${openFilters ? "block" : "hidden"} lg:block`}>
            <div className="border border-gray-200 rounded-lg pl-5 py-5 mt-6 bg-white shadow-sm">
              <p className="mb-4 text-sm font-semibold text-gray-800">
                ROOM TYPES
              </p>

              <div className="flex flex-col gap-3 text-sm text-gray-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={toggleRoomType}
                    type="checkbox"
                    value="Single Bed"
                    checked={selectedRoomTypes.includes("Single Bed")}
                    className="w-4 h-4"
                  />
                  Single Bed
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={toggleRoomType}
                    type="checkbox"
                    value="Double Bed"
                    checked={selectedRoomTypes.includes("Double Bed")}
                    className="w-4 h-4"
                  />
                  Double Bed
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={toggleRoomType}
                    type="checkbox"
                    value="Family Suite"
                    checked={selectedRoomTypes.includes("Family Suite")}
                    className="w-4 h-4"
                  />
                  Family Suite
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={toggleRoomType}
                    type="checkbox"
                    value="Luxury Room"
                    checked={selectedRoomTypes.includes("Luxury Room")}
                    className="w-4 h-4"
                  />
                  Luxury Room
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={toggleRoomType}
                    type="checkbox"
                    value="Deluxe Room"
                    checked={selectedRoomTypes.includes("Deluxe Room")}
                    className="w-4 h-4"
                  />
                  Deluxe Room
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={toggleRoomType}
                    type="checkbox"
                    value="Executive Suite"
                    checked={selectedRoomTypes.includes("Executive Suite")}
                    className="w-4 h-4"
                  />
                  Executive Suite
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={toggleRoomType}
                    type="checkbox"
                    value="Sea View Room"
                    checked={selectedRoomTypes.includes("Sea View Room")}
                    className="w-4 h-4"
                  />
                  Sea View Room
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={toggleRoomType}
                    type="checkbox"
                    value="Mountain View Deluxe"
                    checked={selectedRoomTypes.includes("Mountain View Deluxe")}
                    className="w-4 h-4"
                  />
                  Mountain View Deluxe
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={toggleRoomType}
                    type="checkbox"
                    value="Premium Cottage"
                    checked={selectedRoomTypes.includes("Premium Cottage")}
                    className="w-4 h-4"
                  />
                  Premium Cottage
                </label>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg pl-5 py-5 mt-5 bg-white shadow-sm">
              <p className="mb-4 text-sm font-semibold text-gray-800">
                PRICE RANGE
              </p>

              <div className="flex flex-col gap-3 text-sm text-gray-600">
                {priceRanges.map((range) => (
                  <label
                    key={range.label}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      onChange={togglePriceRange}
                      type="checkbox"
                      value={range.label}
                      checked={selectedPriceRanges.includes(range.label)}
                      className="w-4 h-4"
                    />
                    {range.label === "7500+"
                      ? "$7500+"
                      : `$${range.min} – $${range.max}`}
                  </label>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg pl-5 py-5 mt-5 bg-white shadow-sm">
              <p className="mb-4 text-sm font-semibold text-gray-800">
                SORT BY
              </p>

              <div className="flex flex-col gap-3 text-sm text-gray-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sortOption"
                    value="relevant"
                    checked={sortType === "relevant"}
                    onChange={(e) => setSortType(e.target.value)}
                    className="w-4 h-4"
                  />
                  Most Relevant
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sortOption"
                    value="Price Low to High"
                    checked={sortType === "Price Low to High"}
                    onChange={(e) => setSortType(e.target.value)}
                    className="w-4 h-4"
                  />
                  Price Low to High
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sortOption"
                    value="Price High to Low"
                    checked={sortType === "Price High to Low"}
                    onChange={(e) => setSortType(e.target.value)}
                    className="w-4 h-4"
                  />
                  Price High to Low
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="sortOption"
                    value="Newest First"
                    checked={sortType === "Newest First"}
                    onChange={(e) => setSortType(e.target.value)}
                    className="w-4 h-4"
                  />
                  Newest First
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Database room cards */}
        <div>
          {rooms.length === 0 ? (
            <p className="text-gray-500 text-center mt-20">
              No rooms available right now.
            </p>
          ) : filterRooms.length === 0 ? (
            <p className="text-gray-500 text-center mt-20">
              No rooms match your filters.
            </p>
          ) : (
            filterRooms.map((room) => (
              <div
                key={room._id}
                className="grid md:grid-cols-[2fr_3fr] gap-6 bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6 shadow-sm"
              >
                <div className="overflow-hidden">
                  <img
                    src={room.images?.[0]}
                    alt={room.hotel?.name || room.roomType}
                    onClick={() => navigate(`/rooms/${room._id}`)}
                    className="w-full h-full min-h-[260px] object-cover cursor-pointer hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      {room.hotel?.city}
                    </p>

                    <h2
                      onClick={() => navigate(`/rooms/${room._id}`)}
                      className="text-2xl font-semibold mt-1 cursor-pointer hover:text-blue-600"
                    >
                      {room.hotel?.name}
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                      {room.roomType}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <StarRating rating={4.5} />
                      <span className="text-sm text-gray-500">
                        200+ Reviews
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-3 text-gray-600">
                      <img
                        src={assets.locationIcon}
                        alt=""
                        className="w-4 h-4"
                      />
                      <span className="text-sm">
                        {room.hotel?.address}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">
                      {room.amenities?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg"
                        >
                          {facilityIcons[item] && (
                            <img
                              src={facilityIcons[item]}
                              alt=""
                              className="w-4 h-4"
                            />
                          )}
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AllRooms;
