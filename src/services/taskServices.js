import prisma from "../config/db.js";

const createTask = async (userId, title, description) => {
  return await prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });
};

export { createTask };
