import React, { useState } from "react";
import Title from "../../components/Title";

const AddRoom = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  return (
    <form className="max-w-3xl bg-white p-6 rounded-xl shadow-md mb-20">
      <Title
        title={"Add New Room"}
        subTitle={
          "Create and publish a new room listing with details, pricing, amenities, and images."
        }
      />

      {/* Images */}
      <div className="mt-5">
        <p className="font-medium mb-3">Room Images</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <label className="border-2 border-dashed rounded-lg h-32 flex items-center justify-center cursor-pointer overflow-hidden">
            {image1 ? (
              <img
                src={URL.createObjectURL(image1)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Upload</span>
            )}

            <input
              type="file"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>

          <label className="border-2 border-dashed rounded-lg h-32 flex items-center justify-center cursor-pointer overflow-hidden">
            {image2 ? (
              <img
                src={URL.createObjectURL(image2)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Upload</span>
            )}

            <input
              type="file"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>

          <label className="border-2 border-dashed rounded-lg h-32 flex items-center justify-center cursor-pointer overflow-hidden">
            {image3 ? (
              <img
                src={URL.createObjectURL(image3)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Upload</span>
            )}

            <input
              type="file"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>

          <label className="border-2 border-dashed rounded-lg h-32 flex items-center justify-center cursor-pointer overflow-hidden">
            {image4 ? (
              <img
                src={URL.createObjectURL(image4)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Upload</span>
            )}

            <input
              type="file"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      {/* Room Type */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">Room Type</label>

        {/* size can increase decrease with max-w-70 */}

        <select className="w-full max-w-80 border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500">
          <option>Select Room Type</option>
          <option>Single Bed</option>
          <option>Double Bed</option>
          <option>Luxury Room</option>
          <option>Family Suite</option>
        </select>
      </div>

      {/* Price */}
      <div className="mt-5 max-w-90">
        <label className="block mb-2 font-medium">Price Per Night</label>

        <input
          type="number"
          placeholder="Enter room price"
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* Amenities */}
      <div className="mt-5">
        <p className="font-medium mb-3">Amenities</p>

        <div className="grid md:grid-cols-2 gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Free Wifi
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Free Breakfast
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Room Service
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Mountain View
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Pool Access
          </label>
        </div>
      </div>

      {/* Description */}
      <div className="mt-5">
        <label className="block mb-2 font-medium">Description</label>

        <textarea
          rows="4"
          placeholder="Write room description..."
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 resize-none"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
      >
        Add Room
      </button>
    </form>
  );
};

export default AddRoom;
