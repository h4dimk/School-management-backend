import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { DB_URI } = process.env;

const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(DB_URI || "");
    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
