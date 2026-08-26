import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getProfile, updateProfile, deleteProfile } from "../controllers/userController.js";

const router = express.Router();

// Route to get the user profile
router.get("/profile", authMiddleware, getProfile)

// Updating existing records of a user
router.put("/profile", authMiddleware, updateProfile)

// Delete user profile.
router.delete("/profile", authMiddleware, deleteProfile)

export default router;
