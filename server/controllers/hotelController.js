import Hotel from "../model/Hotel.js";
import User from "../model/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, city, contact } = req.body;

    console.log("BODY:", req.body);
    console.log("USER ID:", req.auth.userId);

    const { userId: owner } = req.auth();

    const existingHotel = await Hotel.findOne({ owner });

    console.log("EXISTING HOTEL:", existingHotel);

    if (existingHotel) {
      return res.json({
        success: false,
        message: "HOTEL ALREADY REGISTERED",
      });
    }

    const hotel = await Hotel.create({
      name,
      address,
      city,
      contact,
      owner,
    });

    console.log("HOTEL CREATED:", hotel);

    const user = await User.findByIdAndUpdate(
      owner,
      { role: "hotelOwner" },
      { new: true },
    );

    console.log("UPDATED USER:", user);

    return res.json({
      success: true,
      message: "HOTEL REGISTERED SUCCESSFULLY",
    });
  } catch (error) {
    console.error("REGISTER HOTEL ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
