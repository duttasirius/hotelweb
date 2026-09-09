import Hotel from "../model/Hotel.js";
import User from "../model/User.js";

export const registerHotel = async (req, res) => {
  try {
    const { name, address, city, contact } = req.body;
    const owner = req.userId;

    if (!name?.trim() || !address?.trim() || !city?.trim() || !contact?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All hotel details are required",
      });
    }

    const existingHotel = await Hotel.findOne({ owner });

    if (existingHotel) {
      return res.status(409).json({
        success: false,
        message: "HOTEL ALREADY REGISTERED",
      });
    }

    await Hotel.create({
      name: name.trim(),
      address: address.trim(),
      city: city.trim(),
      contact: contact.trim(),
      owner,
    });

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    return res.json({
      success: true,
      message: "HOTEL REGISTERED SUCCESSFULLY",
    });
  } catch (error) {
    console.error("REGISTER HOTEL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
