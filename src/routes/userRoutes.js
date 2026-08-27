import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/userController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

// Route to get the user profile
router.get("/profile", authMiddleware, asyncHandler(getProfile));

// Updating existing records of a user
router.put("/profile", authMiddleware, asyncHandler(updateProfile));

// Delete user profile.
router.delete("/profile", authMiddleware, asyncHandler(deleteProfile));

export default router;
