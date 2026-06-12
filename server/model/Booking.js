import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      ref: "User",
    },

    room: {
      type: String,
      required: true,
      ref: "Room",
    },

    hotel: {
      type: String,
      required: true,
      ref: "Hotel",
    },

    checkInDate: {
      type: Date,
      required: true,
    },

    checkOutDate: {
      type: Date,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    guest: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Pay At Hotel",
    },

    isPaid: {
      type: Boolean,
      default: false,
    },

    razorpayOrderId: String,

    razorpayPaymentId: String,

    razorpaySignature: String,

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
