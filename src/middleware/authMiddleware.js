import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("No token provided.", 401);
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    throw new AppError("Invalid or expired token.", 401);
  }
};

export default authMiddleware;
