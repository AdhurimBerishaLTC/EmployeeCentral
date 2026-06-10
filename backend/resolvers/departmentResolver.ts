import Department from "../models/departmentModel.js";
import User from "../models/userModel.js";

interface CreateDepartmentInput {
  name: string;
  code: string;
  description?: string;
  managerId?: string;
  isActive?: boolean;
}

interface UpdateDepartmentInput {
  name?: string;
  code?: string;
  description?: string;
  managerId?: string;
  isActive?: boolean;
}

export const departmentResolver = {
  Query: {
    getDepartments: async () => {
      return await Department.find();
    },
    getDepartmentById: async (_: unknown, { id }: { id: string }) => {
      const department = await Department.findById(id);

      if (!department) {
        throw new Error("Department not found");
      }

      return department;
    },
  },
  Mutation: {
    createDepartment: async (
      _: unknown,
      { input }: { input: CreateDepartmentInput },
    ) => {
      const existingDepartment = await Department.findOne({ name: input.name });

      if (existingDepartment) {
        throw new Error("Department already exists");
      }

      const department = await Department.create({
        name: input.name,
        code: input.code,
        description: input.description,
        manager: input.managerId,
        isActive: input.isActive ?? true,
      });

      return department;
    },
    updateDepartment: async (
      _: unknown,
      { id, input }: { id: string; input: UpdateDepartmentInput },
    ) => {
      const department = await Department.findByIdAndUpdate(id, input, {
        new: true,
      });

      if (!department) {
        throw new Error("Department not found");
      }

      return department;
    },
    deleteDepartment: async (_: unknown, { id }: { id: string }) => {
      const department = await Department.findByIdAndDelete(id);

      if (!department) {
        throw new Error("Department not found");
      }

      return !!department;
    },
  },
  Department: {
    employees: async (parent: any) => {
      return User.find({
        department: parent.id,
      });
    },
  },
};
