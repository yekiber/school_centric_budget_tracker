import Actor from "../models/actorModel.js";
import Student from "../models/studentModel.js";

export const getStats = async (req, res) => {
  try {
    const totalActors = await Actor.countDocuments(); // Count total actors
    const totalStudents = await Student.countDocuments(); // Count total students
    const totalRegistered = totalActors + totalStudents; // Sum both

    res.status(200).json({
      totalActors,
      totalStudents,
      totalRegistered,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ message: "Server error" });
  }
};