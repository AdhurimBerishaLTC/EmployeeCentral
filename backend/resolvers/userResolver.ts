import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Department from "../models/departmentModel.js";

interface CreateUserInput {
  email: string;
  password: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  department?: string;
  role?: "employee" | "team_lead" | "manager" | "hr" | "admin" | "super_admin";
  employmentType?: "full_time" | "part_time" | "contractor" | "intern";
  joiningDate?: string;
  status?: "active" | "inactive" | "terminated";
}

interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  phone?: string;
  department?: string;
  role?: "employee" | "team_lead" | "manager" | "hr" | "admin" | "super_admin";
  employmentType?: "full_time" | "part_time" | "contractor" | "intern";
  status?: "active" | "inactive" | "terminated";
}

interface IUser {
  id: string;
  email: string;
  password: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  department?: string;
  role?: "employee" | "team_lead" | "manager" | "hr" | "admin" | "super_admin";
  employmentType?: "full_time" | "part_time" | "contractor" | "intern";
  joiningDate?: string;
  status?: "active" | "inactive" | "terminated";
}

export const userResolver = {
  Query: {
    getUsers: async () => {
      const users = await User.find();

      if (!users) {
        throw new Error("No users found");
      }

      return users;
    },
    getUserById: async (_: unknown, { id }: { id: string }) => {
      const user = await User.findById(id);

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
  },
  Mutation: {
    createUser: async (_: unknown, { input }: { input: CreateUserInput }) => {
      const existingEmail = await User.findOne({ email: input.email });

      if (existingEmail) {
        throw new Error("Email already exists");
      }

      const existingEmployee = await User.findOne({
        employeeId: input.employeeId,
      });

      if (existingEmployee) {
        throw new Error("Employee already exists");
      }

      const passwordHash = await bcrypt.hash(input.password, 12);

      const user = await User.create({
        email: input.email,
        passwordHash,
        employeeId: input.employeeId,

        firstName: input.firstName,
        lastName: input.lastName,
        phone: input.phone,
        dateOfBirth: input.dateOfBirth,
        department: input.department,
        role: input.role || "employee",
        employmentType: input.employmentType || "full_time",
        joiningDate: input.joiningDate,
      });

      return user;
    },
    updateUser: async (
      _: unknown,
      { id, input }: { id: string; input: UpdateUserInput },
    ) => {
      const user = await User.findByIdAndUpdate(id, input, { new: true });

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    },
  },
  User: {
    department: async (parent: any) => {
      if (!parent.department) return null;

      return await Department.findById(parent.department);
    },
  },
};
