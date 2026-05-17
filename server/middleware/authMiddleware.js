import jwt from "jsonwebtoken";
import User from "../models/User.js";


// VERIFY TOKEN
export const protect = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

   const user = await User.findById(decoded.id).select("-password");

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};


// ADMIN ONLY
export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }

  next();
};