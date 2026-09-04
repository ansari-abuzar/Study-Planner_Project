import jwt from "jsonwebtoken";
import AppError from "../../../backend/src/utils/appError.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("No token provided.", 401);
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    throw new AppError("Invalid authorization format.", 401);
  }
  
  const token = parts[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    throw new AppError("Invalid or expired token.", 401);
  }
};

export default authMiddleware;
