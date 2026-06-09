import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }
    await mongoose.connect(mongoUri);
    console.log(`Connected to MongoDB`);
  } catch (error) {
    console.log("Failed to connect to MongoDB");
  }
};

export default connectDB;
