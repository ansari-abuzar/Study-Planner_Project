import prisma from "../config/db.js";

// Task creation.
const createTask = async (userId, title, description) => {
  return await prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });
};

// Getting all the tasks of the user.
const getTasks = async (userId, skip, limit) => {
  const [tasks, taskCount] = await Promise.all([
    prisma.task.findMany({
      where: {
        userId,
      },
      skip,
      take: limit,
    }),

    prisma.task.count({
      where: {
        userId,
      },
    }),
  ]);
  return { tasks, taskCount };
};

// Getting a single task by its id.
const getTask = async (userId, id) => {
  return await prisma.task.findFirst({
    where: {
      userId,
      id,
    },
  });
};

// Updating a task.
const updateTask = async (userId, id, data) => {
  return await prisma.task.updateMany({
    where: {
      userId,
      id,
    },
    data,
  });
};

// Deleting a task.
const deleteTask = async (userId, id) => {
  return await prisma.task.deleteMany({
    where: {
      userId,
      id,
    },
  });
};

export { createTask, getTasks, getTask, updateTask, deleteTask };
