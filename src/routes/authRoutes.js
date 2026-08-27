import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

// Registering a user
router.post("/register", asyncHandler(registerUser));

// Login Feature
router.post("/login", asyncHandler(loginUser));

export default router;
