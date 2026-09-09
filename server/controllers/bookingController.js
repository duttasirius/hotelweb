import transporter from "../config/nodemailer.js";
import razorpay from "../config/razorpay.js";
import Booking from "../model/Booking.js";
import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";

export const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  const booking = await Booking.find({
    room,
    checkInDate: { $lte: checkOutDate },
    checkOutDate: { $gte: checkInDate },
  });

  return booking.length === 0;
};

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;

    if (!room || !checkInDate || !checkOutDate) {
      return res.status(400).json({
        success: false,
        message: "Room and both booking dates are required",
      });
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    return res.json({ success: true, isAvailable });
  } catch (error) {
    console.error("CHECK AVAILABILITY ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guest } = req.body;

    if (!room || !checkInDate || !checkOutDate || Number(guest) < 1) {
      return res.status(400).json({
        success: false,
        message: "Room, dates and guest count are required",
      });
    }

    if (new Date(checkInDate) >= new Date(checkOutDate)) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    const isAvailable = await checkAvailability({
      checkOutDate,
      checkInDate,
      room,
    });

    if (!isAvailable) {
      return res.status(409).json({
        success: false,
        message: "ROOM NOT AVAILABLE",
      });
    }

    const roomData = await Room.findById(room).populate("hotel");

    if (!roomData) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 3600 * 24),
    );
    const totalPrice = roomData.pricePerNight * nights;

    const booking = await Booking.create({
      user: req.user._id,
      room,
      hotel: roomData.hotel._id,
      guest: Number(guest),
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: req.user.email,
      subject: "Hotel Booking Confirmation",
      html: `
        <h2>Booking Confirmed 🎉</h2>
        <p>Your room has been booked successfully.</p>
        <h3>Booking Details</h3>
        <ul>
          <li><strong>Hotel:</strong> ${roomData.hotel.name}</li>
          <li><strong>Room Type:</strong> ${roomData.roomType}</li>
          <li><strong>Check-In:</strong> ${checkIn.toDateString()}</li>
          <li><strong>Check-Out:</strong> ${checkOut.toDateString()}</li>
          <li><strong>Guests:</strong> ${guest}</li>
          <li><strong>Nights:</strong> ${nights}</li>
          <li><strong>Total Price:</strong> ₹${totalPrice}</li>
        </ul>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.error("BOOKING EMAIL ERROR:", mailError);
    }

    return res.json({
      success: true,
      message: "ROOM BOOKED SUCCESSFULLY",
      bookingId: booking._id,
    });
  } catch (error) {
    console.error("CREATE BOOKING ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserBooking = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    return res.json({ success: true, bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getHotelBooking = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ owner: req.user._id });

    if (!hotel) {
      return res.json({
        success: false,
        message: "NO HOTEL FOUND",
      });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBooking = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0,
    );

    return res.json({
      success: true,
      dashboardData: {
        totalBooking,
        totalBookings: totalBooking,
        totalRevenue,
        bookings,
      },
    });
  } catch (error) {
    console.error("GET HOTEL BOOKINGS ERROR:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createRazorpayOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.isPaid) {
      return res.status(400).json({
        success: false,
        message: "Booking is already paid",
      });
    }

    const order = await razorpay.orders.create({
      amount: booking.totalPrice * 100,
      currency: "INR",
      receipt: booking._id.toString(),
    });

    booking.razorpayOrderId = order.id;
    await booking.save();

    return res.json({ success: true, order });
  } catch (error) {
    console.error("RAZORPAY ORDER ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyRazorpayPayment = async (req, res) => {
  try {
    const { bookingId, razorpay_order_id } = req.body;

    const booking = await Booking.findOne({
      _id: bookingId,
      user: req.user._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.razorpayOrderId !== razorpay_order_id) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment order",
      });
    }

    const orderInfo = await razorpay.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      booking.isPaid = true;
      booking.status = "confirmed";
      await booking.save();

      return res.json({
        success: true,
        message: "PAYMENT SUCCESSFUL",
      });
    }

    return res.json({
      success: false,
      message: "PAYMENT NOT COMPLETED",
    });
  } catch (error) {
    console.error("PAYMENT VERIFY ERROR:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
