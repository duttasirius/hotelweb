import React from "react";
import Title from "./Title";
import { assets, exclusiveOffers } from "../assets/assets";

const ExclusiveOffers = () => {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-20">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 mb-12">
        <Title
          title="Exclusive Offers"
          subTitle="Unlock special hotel deals, seasonal discounts, and limited-time packages designed to make your stay more affordable, comfortable, and memorable. Book today and enjoy exceptional savings on premium accommodations."
        />

        <button className="flex items-center gap-2 px-6 py-3 font-medium text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg">
          View All Offers
          <img src={assets.arrowIcon} alt="" className="w-4" />
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {exclusiveOffers.map((item) => (
          <div
            key={item._id}
            style={{ backgroundImage: `url(${item.image})` }}
            className="relative h-80 rounded-2xl overflow-hidden bg-cover bg-center text-white"
          >
            {/* Overlay
            <div className="absolute inset-0 bg-black/40"></div> */}

            {/* Discount Badge */}
            <p className="absolute top-4 left-4 z-10 px-3 py-1 text-sm font-semibold bg-orange-500 rounded-full">
              {item.priceOff}% OFF
            </p>

            {/* Content */}
            <div className="absolute left-4 bottom-16 z-10">
              <h3 className="text-2xl font-bold">{item.title}</h3>

              <p className="mt-2 text-sm text-gray-200">{item.description}</p>

              <p className="mt-2 text-sm text-orange-300">
                Expires: {item.expiryDate}
              </p>
            </div>

            {/* Button */}
            <>
              <style>{`
                .button-wrapper::before {
                    animation: spin-gradient 4s linear infinite;
                }
            
                @keyframes spin-gradient {
                    from {
                        transform: rotate(0deg);
                    }
            
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
              <div className="absolute bottom-2 left-2 inline-block p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_#00F5FF,_#00F5FF30,_#00F5FF)] button-wrapper">
                <button className="relative z-10 bg-gray-800 text-white rounded-full px-3 py-2 font-medium text-sm">
                  VIEW OFFERS
                </button>
              </div>
            </>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExclusiveOffers;
