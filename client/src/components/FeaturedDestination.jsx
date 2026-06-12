import React from "react";
import { roomsDummyData } from "../assets/assets";
import HotelCard from "./HotelCard";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContex";

const FeaturedDestination = () => {
  const { rooms, setRooms } = useAppContext();

  const navigate = useNavigate();

  return (
    rooms.length > 0 && (
      <section className="px-6 py-16 md:px-12 lg:px-20">
        {/* Heading */}
        <div className="mb-10 text-center">
          <Title
            title={"Featured Destinations"}
            subTitle={
              "Discover our handpicked hotels and enjoy a memorable stay."
            }
          />
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4">
          {rooms.map((room, index) => (
            <HotelCard room={room} key={room._id} index={index} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/rooms")}
            className=" px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            View All Destinations
          </button>
        </div>
      </section>
    )
  );
};

export default FeaturedDestination;
