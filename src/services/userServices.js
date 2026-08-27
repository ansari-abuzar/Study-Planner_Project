import prisma from "../config/db.js";

const getProfile = async (userId) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const updateProfile = async (userId, name, email) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
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
};

const deleteProfile = async (userId) => {
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
};

export { getProfile, updateProfile, deleteProfile };
