import Student from "../models/studentModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import generateToken from "../utils/generateToken.js";

// Utility: Hash Password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// **1. Register a new Student**
export const registerStudent = async (req, res) => {
  try {
    const {
      studentId,
      firstName,
      middleName,
      lastName,
      email,
      password,
      phoneNumber,
      address,
      grade,
    } = req.body;

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ status: false, message: "Please enter a valid email." });
    }

    // Check if the email already exists
    const studentExists = await Student.findOne({ email: email.toLowerCase() });
    if (studentExists) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Student with this email already exists.",
        });
    }
// Ensure password length > 8
    if (!password || password.length < 8) {
      return res.
      json({
        status: false, 
        message: "Password must be at least 8 characters long." });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const student = new Student({
      studentId,
      firstName,
      middleName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      phoneNumber,
      address,
      grade,
      role: "Student",
    });

    const savedStudent = await student.save();
    res
      .status(201)
      .json({ 
      status: true, 
      message: "Student registered successfully",
      student: { ...savedStudent._doc, password: undefined },
  })
} catch (error) {
    res
      .status(500)
      .json({ status: false, 
      message: error.message || "Server error" });
  }
}

// **2. Student Login with JWT**
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email: email.toLowerCase() });

    if (!student) return false; // Continue to next auth attempt if configured

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      res.status(401).json({ status: false, message: "Invalid password" });
      return true;
    }

    // Check for default password (12345678)
    const isDefaultPassword = await bcrypt.compare(
      "12345678",
      student.password
    );
    if (isDefaultPassword) {
      res.json({
        status: true,
        requiresPasswordChange: true,
        email: student.email,
        role: student.role,
      });
      return true;//optional
    }
    const token = generateToken(student._id); // ✅ Pass the correct ID

    res.json({
      status: true,
      user: {
        _id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        role: student.role,
      },
      token, 
    });
    return true; // (Optional) This `return true;` is not necessary.
  
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
    return true;
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const student = await Student.findOne({ email: email.toLowerCase() });

    if (!student) return false; // Continue to other password change attempts

    if (newPassword !== confirmPassword) {
      res.status(400).json({ status: false, 
        message: "Passwords don't match" });
      return true;
    }

    if (!validator.isStrongPassword(newPassword, { minLength: 8 })) {
      return res
        .status(400)
        .json({
          status: false,
          message: "Password must be at least 8 characters long and strong.",
        });
    }

    student.password = await bcrypt.hash(newPassword, 10);
    await student.save();

    res.json({
      status: true,
      message: "Password updated successfully",
    });
    return true;
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
    return true;
  }
};

// **3. Get All Students**
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ 
      status: false, 
      message: error.message || "Server error" });
  }
};

// **4. Get Student By ID**
export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findById(id).select("-password");
    if (!student)
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};


// **5. Get Student By Custom StudentId (like 'ya1')**
export const getStudentByStudentId = async (req, res) => {
  try {
    const { studentId } = req.params; // Expecting custom student ID like 'ya1'

    // Search by the custom student ID
    const student = await Student.findOne({ studentId }).select("-password");

    if (!student)
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    console.error("getStudentByStudentId error:", error);
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};
// **5. Update Student Details**
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");
    if (!student)
      return res
        .status(404)
        .json({ status: false, message: "Student not found" });
    res.json({
      status: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};

// **6. Delete Student**
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent)
      return res
        .status(404)
        .json({ status: false, 
        message: "Student not found" });

    res.json({ status: true, message: "Student deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};

