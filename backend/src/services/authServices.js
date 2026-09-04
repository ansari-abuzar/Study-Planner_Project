import prisma from "../../../backend/src/config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../../../backend/src/utils/appError.js";

const registerUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExists) {
    throw new AppError("User with the same email already exists.", 409);
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

const loginUser = async (email, password) => {
  const findEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!findEmail) {
    throw new AppError("Invalid Email or Password.", 401);
  }

  const passwordMatch = await bcrypt.compare(password, findEmail.password);

  if (!passwordMatch) {
    throw new AppError("Invalid email or password!", 401);
  }

  const token = jwt.sign({ userId: findEmail.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};

export { registerUser, loginUser };
