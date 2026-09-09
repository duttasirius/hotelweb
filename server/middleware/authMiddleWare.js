import jwt from "jsonwebtoken";
import User from "../model/User.js";

const getBearerToken = (req) => {
  const header = req.headers.authorization || "";

  if (!header.startsWith("Bearer ")) {
    return null;
  }

  return header.slice(7).trim() || null;
};

export const protect = async (req, res, next) => {
  try {
    const token = getBearerToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "NOT AUTHORIZED. PLEASE LOGIN.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId || decoded.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "INVALID AUTHENTICATION TOKEN",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "USER NOT FOUND",
      });
    }

    req.userId = user._id;
    req.user = user;

    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "SESSION EXPIRED. PLEASE LOGIN AGAIN."
          : "INVALID AUTHENTICATION TOKEN",
    });
  }
};
