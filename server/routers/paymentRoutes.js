import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleWare.js";

const paymentRouter = express.Router();

paymentRouter.post("/razorpay", protect, createRazorpayOrder);
paymentRouter.post("/verify-payment", protect, verifyRazorpayPayment);

export default paymentRouter;
