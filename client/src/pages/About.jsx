import React from "react";
import Title from "../components/Title";
import { FaHotel } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[750px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30"></div>

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl text-white">
              <span className="inline-block mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm uppercase tracking-[0.2em]">
                Luxury Hospitality
              </span>

              <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6">
                About Us
              </h1>

              <p className="text-lg md:text-2xl text-gray-200 leading-relaxed">
                Discover our passion for hospitality and our commitment to
                helping travelers find unforgettable stays around the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury hotel"
                className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />

              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md rounded-2xl px-6 py-4 shadow-lg">
                <p className="text-sm text-gray-500">Trusted by</p>
                <h3 className="text-xl font-bold text-slate-900">
                  50,000+ Travelers
                </h3>
              </div>
            </div>

            {/* Text */}
            <div>
              <Title
                title="HOSPITALITY FROM THE HEART"
                subTitle="At HotelWeb, we make finding and booking the perfect hotel simple, fast, and reliable. Explore verified accommodations, compare options, and enjoy a seamless booking experience designed for every traveler."
              />

              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {/* Card 1 */}
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-14 h-14 text-amber-500 mb-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                    />
                  </svg>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Carefully Trusted
                  </h3>

                  <p className="text-gray-600">
                    Verified properties and transparent pricing for complete
                    peace of mind.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-14 h-14 text-amber-500 mb-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    Best Price
                  </h3>

                  <p className="text-gray-600">
                    Exclusive deals and competitive rates with no hidden fees.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-14 h-14 text-amber-500 mb-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    24/7 Support
                  </h3>

                  <p className="text-gray-600">
                    Dedicated assistance whenever you need help during your
                    journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-slate-950 to-slate-800 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center">
              <FaHotel className="text-6xl text-amber-400 mx-auto mb-5" />
              <h3 className="text-5xl font-bold text-white">1200+</h3>
              <p className="text-gray-300 mt-3">Hotels</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center">
              <FaLocationDot className="text-6xl text-amber-400 mx-auto mb-5" />
              <h3 className="text-5xl font-bold text-white">300+</h3>
              <p className="text-gray-300 mt-3">Locations</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center">
              <FaStarHalfAlt className="text-6xl text-amber-400 mx-auto mb-5" />
              <h3 className="text-5xl font-bold text-white">4.8 / 5</h3>
              <p className="text-gray-300 mt-3">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-12 text-center shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready For Your Next Stay?
          </h2>

          <p className="text-gray-300 mb-8 text-lg">
            Discover premium hotels, exceptional comfort, and unforgettable
            experiences around the world.
          </p>

          <button className="px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-all">
            Explore Hotels
          </button>
        </div>
      </section>
    </>
  );
};

export default About;
