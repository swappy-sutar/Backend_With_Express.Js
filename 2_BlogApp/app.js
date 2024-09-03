import express from "express";


const app = express();

app.use(express.json());

import BlogRouter from "./routes/blog.routes.js"

app.use("/api/v1/blog", BlogRouter);


export { app };  
