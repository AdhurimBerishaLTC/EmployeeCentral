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

interface UpdateTaskInput {
  title?: string;
  description?: string;
  status?: "pending" | "in_progress" | "completed";
  assignedTo?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  createdBy?: string;
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
    updateTask: async (
      _: unknown,
      { id, input }: { id: string; input: UpdateTaskInput },
    ) => {
      const updateData: any = {
        title: input.title,
        description: input.description,
        status: input.status,
        priority: input.priority,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
      };

      if (input.assignedTo) {
        updateData.assignedTo = input.assignedTo;
      }

      if (input.createdBy) {
        updateData.createdBy = input.createdBy;
      }

      const task = await Task.findByIdAndUpdate(id, updateData, { new: true });

      if (!task) {
        throw new Error("Task not found");
      }

      return task;
    },
  },
  Task: {
    assignedTo: async (parent: { assignedTo: string }) => {
      return await User.findById(parent.assignedTo);
    },
  },
};
