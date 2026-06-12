import express from "express";
import upload from "../middleware/uploadMIddleWare.js";
import { protect } from "../middleware/authMiddleWare.js";
import {
  createRoom,
  getOwnersRooms,
  getRooms,
  toggleRoomAvailability,
} from "../controllers/roomController.js";

const roomRouter = express.Router();

roomRouter.post("/", upload.array("images", 4), protect, createRoom);
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);
roomRouter.get("/", getRooms);
roomRouter.get("/owner", protect, getOwnersRooms);

export default roomRouter;
