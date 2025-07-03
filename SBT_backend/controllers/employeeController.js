import Employee from "../models/employeeModel.js";

export const getTotalEmployee = async (req, res) => {
  try {
    const totalEmployee = await Employee.countDocuments();
    res.json({ success: true, totalEmployee });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
