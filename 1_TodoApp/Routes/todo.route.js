import express from "express";
import {
  createTodo,
  getTodo,
  getSingleTodo,
  updateTodo,
  deleteTodo,
} from "../Controllers/todo.controller.js";

const router = express.Router();

router.post("/createTodo",createTodo); 
router.get("/getTodos", getTodo); 
router.get("/getTodo/:id", getSingleTodo)
router.post("/updateTodo", updateTodo); 
router.post("/deleteTodo", deleteTodo); 




export default router;