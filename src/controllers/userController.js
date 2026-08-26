import prisma from "../config/db.js";

const getProfile = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.json({ user });
};

const updateProfile = async (req, res) => {
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: { id: req.userId },
    data: {
      name,
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  res.json({ user });
};

const deleteProfile = async (req, res) => {
  await prisma.user.delete({
    where: { id: req.userId },
  });
  res.json({ message: "User deleted successfully." });
};

export { getProfile, updateProfile, deleteProfile };
