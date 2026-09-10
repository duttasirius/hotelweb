import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRouter from "./routers/authRoutes.js";
import userRouter from "./routers/userRoutes.js";
import hotelRouter from "./routers/hotelRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRouter from "./routers/roomRoutes.js";
import bookingRouter from "./routers/bookingRoutes.js";
import paymentRouter from "./routers/paymentRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

await connectDB();
await connectCloudinary();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/room", roomRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/pay", paymentRouter);

app.get("/", (req, res) => res.send("API IS WORKING"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
