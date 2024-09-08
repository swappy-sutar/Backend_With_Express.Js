import express from "express";
import fileUpload from "express-fileupload";
import { cloudinaryConnect } from "./utils/cloudinary.js"; // Corrected import

const app = express();

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", 
  })
);

cloudinaryConnect(); 

import upload from "./routes/fileupload.route.js";

app.use("/api/v1/upload", upload);

export { app };
