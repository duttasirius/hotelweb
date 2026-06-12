import Hotel from "../model/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../model/Room.js";

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities, description } = req.body;

    const hotel = await Hotel.findOne({ owner: req.userId }); // ✅ was req.auth.userId

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: `No hotel found for this owner`,
      });
    }

    const uploadImages = req.files.map(async (file) => {
      console.log("FILE PATH:", file.path);
      const response = await cloudinary.uploader.upload(file.path);
      return response.secure_url;
    });

    const images = await Promise.all(uploadImages);

    await Room.create({
      hotel: hotel._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: JSON.parse(amenities),
      description,
      images,
    });

    return res.json({
      success: true,
      message: "ROOM CREATED SUCCESSFULLY",
    });
  } catch (error) {
    console.error("CREATE ROOM ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        populate: {
          path: "owner",
          select: "image",
        },
      })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      rooms,
    });
  } catch (error) {
    console.error("GET ROOMS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//

export const getOwnersRooms = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({
      owner: req.userId,
    });

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "No hotel found for this owner",
      });
    }

    const rooms = await Room.find({
      hotel: hotel._id,
    }).populate("hotel");

    return res.json({
      success: true,
      rooms,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;

    const room = await Room.findById(roomId); // ✅ renamed roomData -> room for clarity

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    room.isAvailable = !room.isAvailable;
    await room.save(); // ✅ was missing — change was never persisted to DB

    return res.json({
      success: true,
      message: "ROOM AVAILABILITY UPDATED",
    });
  } catch (error) {
    console.error("TOGGLE AVAILABILITY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
