import React, { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import { assets, facilityIcons, roomCommonData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { useAppContext } from "../context/AppContex";
import toast from "react-hot-toast";
import axios from "axios";

const RoomDetails = () => {
  const { id } = useParams();

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

  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [guest, setGuest] = useState(1);
  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const checkAvailability = async () => {
    try {
      if (new Date(checkInDate) >= new Date(checkOutDate)) {
        toast.error("CHECK-IN DATE SHOULD BE BEFORE CHECK-OUT DATE");
        return;
      }

      const { data } = await axios.post("/api/bookings/check-availability", {
        room: id,
        checkInDate,
        checkOutDate,
      });

      if (data.success) {
        setIsAvailable(true);
        toast.success("ROOM IS AVAILABLE");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = await getToken();

      if (!isAvailable) {
        return checkAvailability();
      } else {
        const { data } = await axios.post(
          "/api/bookings/book",
          {
            room: id,
            checkInDate,
            checkOutDate,
            guest,
            paymentMethod: "Pay At Hotel",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (data.success) {
          toast.success(data.message);
          navigate("/my-bookings");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  //******************** */

  useEffect(() => {
    const selectedRoom = rooms.find((room) => room._id === id);

    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images[0]);
    }
  }, [id, rooms]);

  if (!room) {
    return (
      <div className="max-w-7xl mx-auto py-20 text-center">
        <p className="text-gray-500 text-lg">Loading room details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* HEADER */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {room.hotel.name}

            <span className="ml-2 text-lg font-normal text-gray-500">
              ({room.roomType})
            </span>
          </h1>

          <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-medium">
            20% OFF
          </span>
        </div>

        <div className="flex items-center gap-3">
          <StarRating />
          <p className="text-gray-500">200+ Reviews</p>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <img src={assets.locationIcon} alt="Location" className="w-4 h-4" />

          <span>{room.hotel.address}</span>
        </div>
      </div>

      {/* IMAGE GALLERY */}
      <div className="grid lg:grid-cols-[4fr_1.2fr] gap-5 mt-10">
        <div>
          <img
            src={mainImage}
            alt={room.hotel.name}
            className="w-full h-[500px] object-cover rounded-3xl"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          {room.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Room ${index + 1}`}
              onClick={() => setMainImage(image)}
              className={`w-full h-28 object-cover rounded-2xl cursor-pointer transition-all duration-300 ${
                mainImage === image
                  ? "ring-2 ring-blue-500"
                  : "hover:opacity-80"
              }`}
            />
          ))}
        </div>
      </div>

      {/* AMENITIES + PRICE CARD */}
      <div className="grid lg:grid-cols-[2fr_350px] gap-10 mt-14 border-t border-gray-200 pt-10">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What This Room Offers
          </h2>

          <div className="flex flex-wrap gap-3">
            {room.amenities.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl"
              >
                <img src={facilityIcons[item]} alt={item} className="w-5 h-5" />

                <span className="text-sm text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg h-fit lg:sticky lg:top-24">
          <p className="text-5xl font-bold text-gray-900">
            ${room.pricePerNight}
          </p>

          <p className="text-gray-500 mt-2">Per Night</p>

          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition">
            {isAvailable ? "Book Now" : "Check Availability"}
          </button>
        </div>
      </div>

      {/* ROOM FEATURES */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Features</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roomCommonData.map((spec, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg transition"
            >
              <img
                src={spec.icon}
                alt={spec.title}
                className="w-12 h-12 mb-4"
              />

              <p className="font-semibold text-gray-900">{spec.title}</p>

              <p className="text-sm text-gray-500 mt-2">{spec.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROOM DESCRIPTION */}
      <div className="mt-16 border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">
          About This Room
        </h2>

        <p className="text-gray-600 leading-8 max-w-4xl">
          Experience comfort and elegance in our Deluxe Room, thoughtfully
          designed for both relaxation and convenience. Featuring a plush
          king-size bed, modern furnishings, and large windows with beautiful
          city views, this room creates the perfect atmosphere for a memorable
          stay. Guests can enjoy complimentary high-speed Wi-Fi, air
          conditioning, a flat-screen TV, a work desk, and a spacious private
          bathroom with premium toiletries. Whether you're traveling for
          business or leisure, the room offers a peaceful retreat after a busy
          day. Wake up refreshed, enjoy exceptional comfort, and make the most
          of your stay with our outstanding hospitality and amenities.
        </p>
      </div>

      {/* OWNER DETAILS */}
      <div className="mt-16 border-t border-gray-200 pt-10">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              alt="Host"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />

            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                Hosted by John Doe
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                Superhost • 5 Years Hosting Experience
              </p>

              <div className="flex items-center gap-2 mt-2">
                <StarRating />

                <span className="text-sm text-gray-600">200+ Reviews</span>
              </div>
            </div>
          </div>

          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition">
            Contact Host
          </button>
        </div>
      </div>

      {/* AVAILABILITY FORM */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Check Availability
        </h2>

        <form
          onSubmit={onSubmitHandler}
          className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8"
        >
          <div className="grid md:grid-cols-4 gap-5">
            <div className="flex flex-col">
              <label
                htmlFor="checkIn"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Check In
              </label>
              {/* Get today's date in YYYY-MM-DD format for < type="date">
 Example:
 new Date().toISOString() => "2026-06-12T13:15:30.123Z"
 .split("T")[0]          => "2026-06-12" */}

              <input
                onChange={(e) => setCheckInDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                id="checkIn"
                type="date"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="checkOut"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Check Out
              </label>

              <input
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate}
                disabled={!checkInDate}
                id="checkOut"
                type="date"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="guests"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Guests
              </label>

              <input
                onChange={(e) => setGuest(e.target.value)}
                value={guest}
                id="guests"
                type="number"
                min="1"
                placeholder="1"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-xl px-6 py-3 hover:bg-blue-700 transition"
              >
                {isAvailable ? "Book Now" : "Check Availability"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomDetails;
