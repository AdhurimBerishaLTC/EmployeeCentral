import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

interface CreateTaskInput {
  title: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  assignedTo: string;
  priority?: "low" | "medium" | "high";
  dueDate: string;
  createdBy: string;
}

export const taskResolver = {
  Query: {
    getTasks: async () => {
      const tasks = await Task.find();

      if (!tasks) {
        throw new Error("No tasks found");
      }

      return tasks;
    },
    getTaskById: async (_: unknown, { id }: { id: string }) => {
      const task = await Task.findById(id);

      if (!task) {
        throw new Error("Task not found");
      }

      return task;
    },
  },
  Mutation: {
    createTask: async (_: unknown, { input }: { input: CreateTaskInput }) => {
      const task = await Task.create({
        ...input,
        dueDate: new Date(input.dueDate),
      });
      return task;
    },
  },
  Task: {
    assignedTo: async (parent: { assignedTo: string }) => {
      return await User.findById(parent.assignedTo);
    },
  },
};
