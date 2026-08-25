import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const router = express.Router();

// Registering a user
router.post("/register", registerUser);

// Login Feature
router.post("/login",loginUser)

export default router;
