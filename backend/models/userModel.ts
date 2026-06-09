import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: String,
  dateOfBirth: Date,

  // Organization/Department
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
  role: {
    type: String,
    enum: ["employee", "team_lead", "manager", "hr", "admin", "super_admin"],
    default: "employee",
  },
  employmentType: {
    type: String,
    enum: ["full_time", "part_time", "contractor", "intern"],
    default: "full_time",
  },
  joiningDate: Date,
  status: {
    type: String,
    enum: ["active", "inactive", "terminated"],
    default: "active",
  },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
