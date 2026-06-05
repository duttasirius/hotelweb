import React from "react";

const Title = ({ title, subTitle }) => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>

      <p className="mt-3 text-gray-500 text-sm md:text-base leading-relaxed">
        {subTitle}
      </p>
    </div>
  );
};

export default Title;
