import express from "express"
import dotenv from "dotenv";
import { DB_Connect } from "./DB/connection.js";

dotenv.config({
  path: "./env",
});

const app = express();

app.use(express.json());

DB_Connect()


import todoRoutes from "./Routes/todo.route.js"
app.use("/api/v1", todoRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`);
});
  