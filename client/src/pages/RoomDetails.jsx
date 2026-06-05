import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  assets,
  facilityIcons,
  roomCommonData,
  roomsDummyData,
} from "../assets/assets";
import StarRating from "../components/StarRating";

const RoomDetails = () => {
  const { id } = useParams();

  const [room, setRoom] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const selectedRoom = roomsDummyData.find((room) => room._id === id);

    if (selectedRoom) {
      setRoom(selectedRoom);
      setMainImage(selectedRoom.images[0]);
    }
  }, [id]);

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
            Reserve Room
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

        <form className="bg-white border border-gray-200 rounded-3xl shadow-xl p-8">
          <div className="grid md:grid-cols-4 gap-5">
            <div className="flex flex-col">
              <label
                htmlFor="checkIn"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Check In
              </label>

              <input
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
                Check Availability
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomDetails;
