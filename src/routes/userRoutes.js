import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "You can access this route!", userId: req.userId });
});

export default router;
