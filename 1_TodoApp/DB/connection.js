import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_Connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected!!");
  } catch (error) {
    console.error("DB Connection Error", error);
    process.exit(1);
  }
};

export { DB_Connect };
