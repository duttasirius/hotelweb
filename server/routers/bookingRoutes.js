import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import {
  checkAvailability,
  checkAvailabilityAPI,
  createBooking,
  getHotelBooking,
  getUserBooking,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityAPI);
bookingRouter.post("/book", protect, createBooking);
bookingRouter.get("/user", protect, getUserBooking);
bookingRouter.get("/hotel", protect, getHotelBooking);

export default bookingRouter;
