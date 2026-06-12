import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controllers/bookingController.js";

const paymentRouter = express.Router();

paymentRouter.post("/razorpay", createRazorpayOrder);
paymentRouter.post("/verify-payment", verifyRazorpayPayment);

export default paymentRouter;
