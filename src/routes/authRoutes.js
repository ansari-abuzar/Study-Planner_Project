import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  authLimiter,
  loginLimiter,
} from "../middleware/rateLimiterMiddleware.js";

const router = express.Router();

// Registering a user
router.post("/register", authLimiter, asyncHandler(registerUser));

// Login Feature
router.post("/login", loginLimiter, asyncHandler(loginUser));

export default router;
