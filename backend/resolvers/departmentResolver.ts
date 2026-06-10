import Department from "../models/departmentModel.js";

interface CreateDepartmentInput {
  name: string;
  code: string;
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
  },
};
