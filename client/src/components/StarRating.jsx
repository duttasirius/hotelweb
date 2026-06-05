import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const StarRating = ({ rating = 4.5 }) => {
  const totalStars = 5;

  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        if (rating >= starValue) {
          return <FaStar key={index} className="text-yellow-400" />;
        }

        if (rating >= starValue - 0.5) {
          return <FaStarHalfAlt key={index} className="text-yellow-400" />;
        }

        return <FaRegStar key={index} className="text-yellow-400" />;
      })}

      <span className="ml-2 text-sm text-gray-600">{rating}</span>
    </div>
  );
};

export default StarRating;
