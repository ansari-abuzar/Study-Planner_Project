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

  const task = await createTaskService(req.userId, title, description);

  res.status(201).json({
    message: "Task created successfully.",
    task,
  });
};

// Getting all the tasks of the logged in user.
const getTasks = async (req, res) => {
  const tasks = await getTasksService(req.userId);

  res.status(200).json(tasks);
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
  const data = req.body;

  const result = await updateTaskService(req.userId, id, data);

  if (result.count === 0) {
    throw new AppError("Task not found!", 404);
  }

  res.status(200).json({ message: "Task updated successfully." });
};

// Deleting a task by its id.
const deleteTask = async (req, res) => {
  const { id } = req.params;

  await deleteTaskService(req.userId, id);

  if (result.count === 0) {
    throw new AppError("Task not found!", 404);
  }

  res.status(200).json({ message: "Task deleted successfully." });
};

export { createTask, getTasks, getTask, updateTask, deleteTask };
