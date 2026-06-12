import React, { useEffect, useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContex";

const slides = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // beach
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e", // mountains
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // lake
  "https://images.unsplash.com/photo-1519046904884-53103b34b206", // resort
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4", // luxury hotel
];

const Hero = () => {
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
    axios,
    rooms,
    setRooms,
  } = useAppContext();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [destination, setDestination] = useState("");

  // Function runs when the search form is submitted
  const onSearch = async (e) => {
    // Prevents the page from refreshing after form submission
    e.preventDefault();

    try {
      // Redirects the user to the rooms page
      // Example: /rooms?destination=Kolkata
      navigate(`/rooms?destination=${destination}`);
      const token = await getToken();
      await axios.post(
        "/api/user/store-recent-search",
        {
          recentSearchCity: destination,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Updates the searched cities state
      setSearchedCities((prevSearchedCities) => {
        // Creates a new array containing:
        // 1. All previous searched cities
        // 2. The newly searched destination
        const updatedSearchedCities = [...prevSearchedCities, destination];

        // If more than 3 cities are stored
        if (updatedSearchedCities.length > 3) {
          // Remove the first (oldest) city
          // Example:
          // ["Delhi", "Mumbai", "Pune", "Kolkata"]
          // becomes
          // ["Mumbai", "Pune", "Kolkata"]
          updatedSearchedCities.shift();
        }

        // Return the updated array
        // React uses this value as the new state
        return updatedSearchedCities;
      });
    } catch (error) {
      console.error("Error storing recent search:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
        <div className="flex flex-col items-start max-w-4xl">
          <p className="text-white uppercase text-sm mb-4 max-sm:hidden">
            The Ultimate Hotel Experience
          </p>

          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
            Discover The Perfect Gateway Destination
          </h1>

          <p className="text-white/90 text-lg mt-6 max-w-2xl">
            Discover exceptional hotels, unbeatable deals, and seamless booking
            for your next adventure.
          </p>

          <form
            onSubmit={onSearch}
            className="bg-white text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row md:items-end gap-4 max-md:w-full shadow-xl"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <img src={assets.calenderIcon} className="h-4" alt="" />
                <label htmlFor="destinationInput">Destination</label>
              </div>

              <input
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
                list="destinations"
                id="destinationInput"
                type="text"
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
                placeholder="Type here"
                required
              />

              <datalist id="destinations">
                {cities.map((city, index) => (
                  <option value={city} key={index} />
                ))}
              </datalist>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <img src={assets.calenderIcon} className="h-4" alt="" />
                <label htmlFor="checkIn">Check In</label>
              </div>

              <input
                id="checkIn"
                type="date"
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <img src={assets.calenderIcon} className="h-4" alt="" />
                <label htmlFor="checkOut">Check Out</label>
              </div>

              <input
                id="checkOut"
                type="date"
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="guests">Guests</label>

              <input
                min={1}
                max={10}
                id="guests"
                type="number"
                className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none w-20"
                placeholder="1"
              />
            </div>

            <>
              <style>{`
    @keyframes shine {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .button-bg {
      background: conic-gradient(
        from 0deg,
        #00F5FF,
        #FF00C7,
        #FFD700,
        #00FF85,
        #8A2BE2,
        #00F5FF
      );
      background-size: 300% 300%;
      animation: shine 4s ease-out infinite;
    }
  `}</style>

              <div className="button-bg rounded-full p-[2px] w-full sm:w-auto hover:scale-105 transition duration-300 active:scale-100">
                <button
                  className="
        w-full sm:w-auto
        px-5 sm:px-8
        py-2.5
        flex items-center justify-center gap-2
        text-sm font-medium
        text-white
        rounded-full
        bg-gray-800
      "
                >
                  <img src={assets.searchIcon} alt="" className="w-4 h-4" />
                  Search Now
                </button>
              </div>
            </>
          </form>

          {/* Dots */}
          <div className="flex gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
