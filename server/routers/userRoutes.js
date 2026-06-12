import express from "express";
import { protect } from "../middleware/authMiddleWare.js";
import {
  getUserData,
  storeRecentSearchCities,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
userRouter.post("/store-recent-search", protect, storeRecentSearchCities);

export default userRouter;
