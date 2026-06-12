import transporter from "../config/nodemailer.js";
import Booking from "../model/Booking.js";
import Hotel from "../model/Hotel.js";
import Room from "../model/Room.js";

//function to check available room
export const checkAvailability = async ({
  checkInDate,
  checkOutDate,
  room,
}) => {
  try {
    // Find all bookings for this room that overlap
    // with the user's requested dates
    const booking = await Booking.find({
      // Only check bookings for the selected room
      room,

      // Existing booking's check-in date must be
      // before or equal to the user's check-out date
      checkInDate: { $lte: checkOutDate },

      // *** suppose a 10(check-in) - 12(check-out)th is booked either  you have to check-in before that or check-out before that

      // Existing booking's check-out date must be
      // after or equal to the user's check-in date
      checkOutDate: { $gte: checkInDate },
      // means -- The existing guest is still staying when the new guest wants to arrive, so there is an overlap.
    });

    // If no overlapping bookings are found,
    // the room is available
    const isAvailable = booking.length === 0;

    // Return true if available, false if already booked
    return isAvailable;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// api to check availability of room
export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;

    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });

    res.json({
      success: true,
      isAvailable,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// create new booking

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guest } = req.body;

    const user = req.user._id;

    // before booking  check availability
    const isAvailable = await checkAvailability({
      checkOutDate,
      checkInDate,
      room,
    });

    if (!isAvailable) {
      return res.json({
        success: false,
        message: "ROOM NOT AVAILABLE",
      });
    }

    // Find the room by its ID
    // Also fetch the related hotel document using populate()
    const roomData = await Room.findById(room).populate("hotel");

    // Start with the price of one night
    let totalPrice = roomData.pricePerNight;

    // Convert the incoming date strings into JavaScript Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Get the difference between the two dates in milliseconds
    const timeDiff = checkOut.getTime() - checkIn.getTime();

    // Convert milliseconds into number of nights
    // 1000 = milliseconds in 1 second
    // 3600 = seconds in 1 hour
    // 24 = hours in 1 day
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    // Multiply room price by total nights
    totalPrice *= nights;

    const booking = await Booking.create({
      user,
      room,
      //     from this line  found the room & stored roomData var  -- const roomData = await Room.findById(room).populate("hotel");
      hotel: roomData.hotel._id,
      guest: +guest,
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
      <li><strong>Check-In:</strong> ${new Date(checkInDate).toDateString()}</li>
      <li><strong>Check-Out:</strong> ${new Date(checkOutDate).toDateString()}</li>
      <li><strong>Guests:</strong> ${guest}</li>
      <li><strong>Nights:</strong> ${nights}</li>
      <li><strong>Total Price:</strong> $${totalPrice}</li>
    </ul>

    <p>Thank you for choosing us. We look forward to hosting you!</p>
  `,
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "ROOM BOOKED SUCCESSFULLY",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all booking for users
export const getUserBooking = async (req, res) => {
  try {
    const user = req.user._id;

    const bookings = await Booking.find({ user })
      .populate("room hotel")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getHotelBooking = async (req, res) => {
  try {
    // Find the hotel whose owner is the currently logged-in Clerk user
    // req.auth.userId comes from Clerk authentication middleware
    const hotel = await Hotel.findOne({
      owner: req.auth.userId,
    });

    if (!hotel) {
      return res.json({
        success: false,
        message: "NO HOTEL FOUND",
      });
    }

    // Find all bookings for this hotel
    // hotel._id is the MongoDB id & stored above hotel variable
    const bookings = await Booking.find({
      hotel: hotel._id,
    })

      // Replace room, hotel and user IDs with full documents
      .populate("room hotel user")

      // Sort newest bookings first
      // -1 = descending order
      .sort({ createdAt: -1 });

    // Count total number of bookings
    const totalBooking = bookings.length;

    // Calculate total revenue by adding every booking's totalPrice
    // reduce() returns that final value:
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0,
    );
    /*
=========================================
CALCULATE TOTAL REVENUE USING REDUCE()
=========================================

Code:

const totalRevenue = bookings.reduce(
  (acc, booking) => acc + booking.totalPrice,
  0
);

Purpose:
--------
Calculate the total revenue generated from all bookings.

bookings:
---------
An array of booking objects.

Example:

const bookings = [
  { totalPrice: 1000 },
  { totalPrice: 2000 },
  { totalPrice: 3000 }
];

reduce():
---------
reduce() loops through every item in the array and
reduces the entire array into a single value.

Syntax:

array.reduce(
  (accumulator, currentItem) => {},
  initialValue
)

In our code:

acc     = accumulator (running total)
booking = current booking object
0       = starting value of acc

Step-by-step execution:
-----------------------

Initial:

acc = 0

---------------------------------
Iteration 1
---------------------------------

booking = { totalPrice: 1000 }

acc + booking.totalPrice

0 + 1000 = 1000

New acc = 1000

---------------------------------
Iteration 2
---------------------------------

booking = { totalPrice: 2000 }

1000 + 2000 = 3000

New acc = 3000

---------------------------------
Iteration 3
---------------------------------

booking = { totalPrice: 3000 }

3000 + 3000 = 6000

New acc = 6000

---------------------------------
End of loop
---------------------------------

reduce() returns:

6000

Therefore:

const totalRevenue = 6000;

Visual Flow:
------------

acc = 0
  ↓
0 + 1000 = 1000
  ↓
1000 + 2000 = 3000
  ↓
3000 + 3000 = 6000
  ↓
Final Revenue = 6000

Equivalent for-loop:
--------------------

let totalRevenue = 0;

for (const booking of bookings) {
  totalRevenue += booking.totalPrice;
}

Both approaches produce the same result.

Final Meaning:
--------------
"Go through every booking, take its totalPrice,
keep adding it to the running total (acc),
and return the final revenue amount."
*/
    res.json({
      success: true,
      dashboardData: {
        totalBooking,
        totalRevenue,
        bookings,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
