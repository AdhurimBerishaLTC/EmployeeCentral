import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Department from "../models/departmentModel.js";
import jwt from "jsonwebtoken";

interface CreateUserInput {
  email: string;
  password: string;
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
    me: async (_: unknown, __: unknown, context: any) => {
      if (!context.user) {
        throw new Error("Unauthorized");
      }

      return await User.findById(context.user.userId);
    },
  },
  Mutation: {
    createUser: async (_: unknown, { input }: { input: CreateUserInput }) => {
      const existingEmail = await User.findOne({ email: input.email });

      if (existingEmail) {
        throw new Error("Email already exists");
      }

      const passwordHash = await bcrypt.hash(input.password, 12);

      const employeeId = `EMP-${Math.floor(1000 + Math.random() * 9000)}`;

      const user = await User.create({
        email: input.email,
        passwordHash,
        employeeId,

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
    deleteUser: async (_: unknown, { id }: { id: string }) => {
      const user = await User.findByIdAndDelete(id);

      if (!user) {
        throw new Error("User not found");
      }
      return !!user;
    },
    login: async (
      _: unknown,
      { email, password }: { email: string; password: string },
    ) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" },
      );

      return { token, user };
    },
  },
  User: {
    department: async (parent: any) => {
      if (!parent.department) return null;

      return await Department.findById(parent.department);
    },
  },
};
