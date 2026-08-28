import {
  createTask as createTaskService,
  getTasks as getTasksService,
  getTask as getTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
} from "../services/taskServices.js";
import AppError from "../utils/appError.js";

// Creating a task.
const createTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    throw new AppError("Task title is required.", 400);
  }

  const task = await createTaskService(req.userId, title, description);

  res.status(201).json({
    message: "Task created successfully.",
    task,
  });
};

// Getting all the tasks of the logged in user.
const getTasks = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  // Validatin the page and limit numbers.
  if (
    !Number.isInteger(pageNumber) ||
    !Number.isInteger(limitNumber) ||
    pageNumber < 1 ||
    limitNumber < 1
  ) {
    throw new AppError("Page and limit must be positive integers.", 400);
  }

  if (limitNumber > 50) {
    throw new AppError("Page Limit cannot be greater that 50!", 400);
  }

  const skip = (pageNumber - 1) * limitNumber;

  const result = await getTasksService(req.userId, skip, limitNumber);

  const totalPages = Math.ceil(result.taskCount / limitNumber);

  res.status(200).json({
    tasks: result.tasks,
    pagination: {
      pages: pageNumber,
      limit: limitNumber,
      totTasks: result.taskCount,
      totalPages,
    },
  });
  // Json always returns a single object.
};

// Getting a task by id.
const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await getTaskService(req.userId, id);

  if (!task) {
    throw new AppError("Task not found!", 404);
  }

  res.status(200).json(task);
};

// Updating a task by id.
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const data = {};

  if (title !== undefined) {
    if (title.trim() === "") {
      throw new AppError("Title cannot be empty.", 400);
    }

    data.title = title;
  }

  if (description !== undefined) {
    data.description = description;
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      throw new AppError("Completed must be a boolean.", 400);
    }

    data.completed = completed;
  }

  if (Object.keys(data).length === 0) {
    throw new AppError("Please provide something to update.", 400);
  }

  const result = await updateTaskService(req.userId, id, data);

  if (result.count === 0) {
    throw new AppError("Task not found!", 404);
  }

  res.status(200).json({ message: "Task updated successfully." });
};

// Deleting a task by its id.
const deleteTask = async (req, res) => {
  const { id } = req.params;

  const result = await deleteTaskService(req.userId, id);

  if (result.count === 0) {
    throw new AppError("Task not found!", 404);
  }

  res.status(200).json({ message: "Task deleted successfully." });
};

export { createTask, getTasks, getTask, updateTask, deleteTask };
