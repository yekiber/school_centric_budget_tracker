import jwt from "jsonwebtoken";  // ✅ Needed for verifying tokens
import Actor from "../models/actorModel.js";
import Student from "../models/studentModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await Actor.findById(decoded._id).select("-password");
    if (!user) {
      user = await Student.findById(decoded._id).select("-password");
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid token. User not found." });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export default auth;