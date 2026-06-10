import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

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

interface User {
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
  },
};
