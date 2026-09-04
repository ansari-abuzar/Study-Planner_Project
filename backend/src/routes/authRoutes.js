import express from "express";
import { loginUser, registerUser } from "../../../backend/src/controllers/authController.js";
import asyncHandler from "../../../backend/src/utils/asyncHandler.js";
import {
  authLimiter,
  loginLimiter,
} from "../../../backend/src/middleware/rateLimiterMiddleware.js";

const router = express.Router();

// Registering a user
router.post("/register", authLimiter, asyncHandler(registerUser));

// Login Feature
router.post("/login", loginLimiter, asyncHandler(loginUser));

export default router;
