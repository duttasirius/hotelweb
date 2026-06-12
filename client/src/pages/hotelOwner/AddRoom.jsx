import React, { useState } from "react";
import Title from "../../components/Title";
import axios from "axios";
import { useAppContext } from "../../context/AppContex";
import toast from "react-hot-toast";

const AddRoom = () => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [roomType, setRoomType] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setAmenities((prev) => [...prev, value]);
    } else {
      setAmenities((prev) => prev.filter((item) => item !== value));
    }
  };

  const { navigate, user, getToken, isOwner } = useAppContext();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("roomType", roomType);
      formData.append("pricePerNight", pricePerNight);
      formData.append("description", description);
      formData.append("amenities", JSON.stringify(amenities));

      if (image1) formData.append("images", image1);
      if (image2) formData.append("images", image2);
      if (image3) formData.append("images", image3);
      if (image4) formData.append("images", image4);

      const token = await getToken();

      console.log("roomType", roomType);
      console.log("pricePerNight", pricePerNight);
      console.log("description", description);
      console.log("amenities", amenities);
      console.log("image1", image1);
      console.log("TOKEN", token);

      const { data } = await axios.post("/api/room", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        toast.success(data.message);

        setRoomType("");
        setPricePerNight("");
        setDescription("");
        setAmenities([]);

        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="max-w-3xl bg-white p-6 rounded-xl shadow-md mb-20"
    >
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

        <select
          onChange={(e) => setRoomType(e.target.value)}
          value={roomType}
          className="w-full max-w-80 border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500"
        >
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
          onChange={(e) => setPricePerNight(e.target.value)}
          value={pricePerNight}
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
            <input
              value="Free Wifi"
              type="checkbox"
              onChange={handleAmenityChange}
            />
            Free Wifi
          </label>

          <label className="flex items-center gap-2">
            <input
              value="Free Breakfast"
              onChange={handleAmenityChange}
              type="checkbox"
            />
            Free Breakfast
          </label>

          <label className="flex items-center gap-2">
            <input
              value="Room Service"
              onChange={handleAmenityChange}
              type="checkbox"
            />
            Room Service
          </label>

          <label className="flex items-center gap-2">
            <input
              value="Mountain View"
              onChange={handleAmenityChange}
              type="checkbox"
            />
            Mountain View
          </label>

          <label className="flex items-center gap-2">
            <input
              onChange={handleAmenityChange}
              value="Pool Access"
              type="checkbox"
            />
            Pool Access
          </label>
        </div>
      </div>

      {/* Description */}
      <div className="mt-5">
        <label className="block mb-2 font-medium">Description</label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          placeholder="Write room description..."
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500 resize-none"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
      >
        {loading ? "Adding Room..." : "Add Room"}
      </button>
    </form>
  );
};

export default AddRoom;
