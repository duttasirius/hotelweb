import User from "../model/User.js";

export const protect = async (req, res, next) => {
  try {
    const { userId } = req.auth();

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "NOT AUTHORIZED",
      });
    }

    req.userId = userId; // ✅ already set — all controllers can use req.userId

    const user = await User.findById(userId);
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  }
};
