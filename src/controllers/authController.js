import prisma from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Input Validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please enter all the details." });
  }

  // Validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Please enter a valid email",
    });
  }

  // Password lenght checker
  if (password.length < 8) {
    return res.status(400).json({
      error: "Password must be atleast 8 characters long.",
    });
  }

  // User Validation
  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (emailExists) {
    return res
      .status(409)
      .json({ error: "User with the same email already exists." });
  }

  // User Creation
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  res.status(201).json({ message: "User created successfully." });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const findEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!findEmail) {
    return res.status(401).json({ error: "Invalid Email or Password." });
  }

  if (await bcrypt.compare(password, findEmail.password)) {
    const token = jwt.sign({ userId: findEmail.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Successfully logged in.", token });
  } else {
    return res.status(401).json({ error: "Invalid Email or Password." });
  }
};

export { registerUser, loginUser };
