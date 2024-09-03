import dotenv from "dotenv";
import { app } from "./app.js";
import { connectionDB } from "./DB/connectDB.js";

dotenv.config();

connectionDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed!!!", err);
  });
