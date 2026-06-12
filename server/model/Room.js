import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId, // ✅ was String
      required: true,
      ref: "Hotel",
    },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true }, // ✅ was String
    amenities: { type: Array, required: true },
    description: { type: String, default: "" }, // ✅ was missing
    images: [{ type: String, required: true }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
