import React, { useEffect, useState } from "react";
import { assets, cities } from "../assets/assets";
import { useAppContext } from "../context/AppContex";

const slides = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1519046904884-53103b34b206",
  "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
];

const Hero = () => {
  const {
    navigate,
    user,
    getToken,
    searchedCities,
    setSearchedCities,
    axios,
  } = useAppContext();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [destination, setDestination] = useState("");

  const onSearch = async (e) => {
    e.preventDefault();

    const city = destination.trim();

    if (!city) return;

    navigate(`/rooms?destination=${encodeURIComponent(city)}`);

    // Recent searches are optional; the hotel search itself remains public.
    if (!user) return;

    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/user/store-recent-search",
        { recentSearchCity: city },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        setSearchedCities(data.recentSearchCities || [
          ...(searchedCities || []).slice(-2),
          city,
        ]);
      }
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
    <section className="relative flex min-h-screen items-center overflow-hidden">
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
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      <div className="relative z-10 w-full px-6 md:px-16 lg:px-24">
        <div className="flex max-w-4xl flex-col items-start">
          <p className="mb-4 hidden text-sm uppercase text-white sm:block">
            The Ultimate Hotel Experience
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Discover The Perfect Gateway Destination
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Discover exceptional hotels, unbeatable deals, and seamless booking
            for your next adventure.
          </p>

          <form
            onSubmit={onSearch}
            className="mt-8 flex w-full flex-col gap-4 rounded-lg bg-white px-6 py-4 text-gray-500 shadow-xl md:flex-row md:items-end md:w-auto"
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
                className="mt-1.5 rounded border border-gray-200 px-3 py-1.5 text-sm outline-none"
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
                className="mt-1.5 rounded border border-gray-200 px-3 py-1.5 text-sm outline-none"
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
                className="mt-1.5 rounded border border-gray-200 px-3 py-1.5 text-sm outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="guests">Guests</label>
              <input
                min={1}
                max={10}
                id="guests"
                type="number"
                className="mt-1.5 w-20 rounded border border-gray-200 px-3 py-1.5 text-sm outline-none"
                placeholder="1"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-black md:w-auto"
            >
              <span className="inline-flex items-center justify-center gap-2">
                <img src={assets.searchIcon} alt="" className="h-4 w-4" />
                Search Now
              </span>
            </button>
          </form>

          <div className="mt-8 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 w-3 rounded-full transition-all ${
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
