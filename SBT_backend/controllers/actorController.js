import Actor from "../models/actorModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import generateToken from "../utils/generateToken.js";

// Utility: Hash Password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// **1. Register a new actor by System Admin in his page**
export const registerActor = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      phoneNumber, 
      address, 
      role } = req.body;

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400)
      .json({status: false, message: "Please enter a valid email." });
    }

    // Check if the email already exists
    const actorExists = await Actor.findOne({ email: email.toLowerCase() });
    if (actorExists) {
      return res
      .status(400)
      .json({status: false, 
      message: "User already exists." });
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

    const actor = new Actor({ 
      firstName, 
      lastName, 
      email: email.toLowerCase(), 
      password: hashedPassword, 
      phoneNumber, 
      address, 
      role 
    });

    const savedActor = await actor.save();
    res
    .status(201)
    .json({
      status: true,
      message: "Actor registered successfully",
      actor: { ...savedActor._doc, password: undefined },
    });
  } catch (error) {
    res
    .status(500)
    .json({ status: false, 
    message: error.message || "Server error" });
  }
};

// loginActor controller
export const loginActor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const actor = await Actor.findOne({ email: email.toLowerCase() });

    if (!actor) return false; // Continue to student login

    const isMatch = await bcrypt.compare(password, actor.password);
    if (!isMatch) {
      res.status(401).json({ status: false, message: "Invalid password" });
      return true;
    }

    // Check for default password
    const isDefaultPassword = await bcrypt.compare(
      "12345678", 
      actor.password);
    if (isDefaultPassword) {
      res.json({ 
        status: true, 
        requiresPasswordChange: true,
        email: actor.email,
        role: actor.role 
      });
      return true;//optional
    }
    const token = generateToken(actor._id);

    res.json({
      status: true,
      user: {
        _id: actor._id,
        firstName: actor.firstName,
        email: actor.email,
        role: actor.role,
      },
      token,
    });
    return true;//optional

  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
    return true;
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    const actor = await Actor.findOne({ email: email.toLowerCase() });

    if (!actor) return false; // Continue to student password change

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

    actor.password = await bcrypt.hash(newPassword, 10);
    await actor.save();

    res.json({ status: true, 
    message: "Password updated successfully" 
  });
    return true;
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
    return true;
  }
};


// **3. Get All Actors in System Admin Page**
export const getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find().select("-password"); // Exclude password from results
    res.status(200).json(actors);
  } catch (error) {
    res
    .status(500)
    .json({
    status:false, 
    message: error.message || "Server error" });
  }
};

// **4. Get Actor By ID**
export const getActorById = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findById(id).select("-password");
    if (!actor) return resjson({status:false, message: "User not found" });

    res.status(200).json(actor);
  } catch (error) {
    res.json({ status:false, message: error.message || "Server error" });
  }
};

// **5. Update Actor Details**
export const updateActor = async (req, res) => {
  try {
    const { id } = req.params;
    const actor = await Actor.findByIdAndUpdate(id, req.body, {
      new: true,
    }).select("-password");
    if (!actor)
      return res
        .status(404)
        .json({ status: false, message: "Staff not found" });
    res.json({
      status: true,
      message: "Staff updated successfully",
      actor,
    });
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: error.message || "Server error" });
  }
};

// **6. Delete Actor**
export const deleteActor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedActor = await Actor.findByIdAndDelete(id);
    if (!deletedActor) 
    return res
       .json({status:false, 
        message: "User not found" });

    res.json({status:true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500). json({status:false, message: error.message || "Server error" });
  }
};

