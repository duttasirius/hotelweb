import hotel1 from "../assets/jw-mar.png";
import hotel2 from "../assets/holin.png";

const OurPartners = () => {
  const hotels = [hotel1, hotel2, hotel1, hotel2, hotel1, hotel2];

  return (
    <>
      <style>{`
                .marquee-inner {
                    animation: marqueeScroll linear infinite;
                }

                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }

                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

      <div className="overflow-hidden w-full relative max-w-5xl mx-auto select-none">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Featured Luxury Stays</h2>

          <p className="text-gray-500 mt-2">
            Discover handpicked hotels and unforgettable experiences.
          </p>
        </div>

        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div
          className="marquee-inner flex will-change-transform min-w-[200%]"
          style={{ animationDuration: "15s" }}
        >
          <div className="flex">
            {[...hotels, ...hotels].map((hotel, index) => (
              <img
                key={index}
                src={hotel}
                alt={`Hotel ${index + 1}`}
                className="w-72 h-44 object-cover rounded-2xl mx-4 shadow-lg"
                draggable={false}
              />
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
    </>
  );
};

export default OurPartners;
