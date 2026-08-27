import { createTask as createTaskService } from "../services/taskServices.js";

const createTask = async (req, res) => {
  const { title, description } = req.body;

  const task = await createTaskService(req.userId, title, description);

  res.status(201).json({
    message: "Task created successfully.",
    task,
  });
};

export { createTask };
