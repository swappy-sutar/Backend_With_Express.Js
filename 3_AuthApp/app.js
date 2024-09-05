import express, { json } from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

import userRouter from "./routes/user.routes.js"

app.use("/api/v1",userRouter);


export {app}