import express from "express";
import {registerActor,loginActor,getAllActors,getActorById,updateActor,deleteActor,changePassword as changeActorPassword,
} from "../controllers/actorController.js";

import {registerStudent,loginStudent,getAllStudents,getStudentById,updateStudent,deleteStudent,changePassword as changeStudentPassword, getStudentByStudentId,
} from "../controllers/studentController.js";

const router = express.Router();

// Actor Routes
router.post("/actors/register", registerActor);
router.get("/actors", getAllActors);
router.get("/actors/:id", getActorById);
router.put("/actors/:id",updateActor);
router.delete("/actors/:id", deleteActor);

// Student Routes
router.post("/students/register", registerStudent);
router.get("/students", getAllStudents);
router.get("/students/:id", getStudentById);
router.get("/students/custom/:studentId", getStudentByStudentId);
router.put("/students/:id", updateStudent);
router.delete("/students/:id", deleteStudent);

// Unified Auth Routes
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Try actor login first
    const actorResult = await loginActor({ body: { email, password } }, res);
    if (actorResult) return;

    // If actor login fails, try student login
    const studentResult = await loginStudent({ body: { email, password } }, res);
    if (studentResult) return;

    // If both fail
    return res.status(401).json({ 
      status: false, 
      message: "Invalid credentials" 
    });

  } catch (error) {
    return res.status(500).json({ 
      status: false, 
      message: "Server error",
      error: error.message 
    });
  }
});

router.put("/change-password", async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Try actor password change
    const actorResult = await changeActorPassword(
      { body: { email, newPassword, confirmPassword } }, 
      res
    );
    if (actorResult) return;

    // Try student password change
    const studentResult = await changeStudentPassword(
      { body: { email, newPassword, confirmPassword } }, 
      res
    );
    if (studentResult) return;

    // If both fail
    return res.status(400).json({ 
      status: false, 
      message: "Password change failed" 
    });

  } catch (error) {
    return res.status(500).json({ 
      status: false, 
      message: "Server error",
      error: error.message 
    });
  }
});

export default router;