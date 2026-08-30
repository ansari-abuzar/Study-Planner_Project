import {
  registerUser as registerUserService,
  loginUser as loginUserService,
} from "../services/authServices.js";
import AppError from "../utils/appError.js";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Input Validation
  if (!name || !email || !password) {
    throw new AppError("Please enter all the details.", 400);
  }

  // Validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    throw new AppError("Please enter a valid email.", 400);
  }

  // Password lenght checker
  if (password.length < 8) {
    throw new AppError("Password must be atleast 8 characters long.", 400);
  }

  // User Creation
  await registerUserService(name, email, password);

  res.status(201).json({ message: "User created successfully." });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const token = await loginUserService(email, password);

  res.status(200).json({ message: "Successfully logged in.", token });
};

export { registerUser, loginUser };
