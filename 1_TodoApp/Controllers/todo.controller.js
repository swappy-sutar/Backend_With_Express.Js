import { asyncHandler } from "../utils/asyncHandler.js";
import { Todo } from "../Models/Todo.model.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const response = await Todo.create({ title, description });

  return res.status(200).json({
    success: true,
    data: response,
    message: "Todo created successfully",
  });
});

const getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.find({});

  return res.status(200).json({
    success: true,
    data: todo,
    message: "Todos fetched successfully",
  });
});

const getSingleTodo = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const todo = await Todo.findById({ _id: id });

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: todo,
    message: "Todo fetched successfully",
  });
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id, title, description } = req.body;

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }

  todo.title = title || todo.title;
  todo.description = description || todo.description;

  const updatedTodo = await todo.save();

  return res.status(200).json({
    success: true,
    data: updatedTodo,
    message: "Todo updated successfully",
  });
});

const deleteTodo = asyncHandler(async (req, res) => {

  const { id } = req.body;
  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }
  return res.status(200).json({
    success: true,
    data: {},
    message: "Todo deleted successfully",
  });
});

export { createTodo, getTodo, getSingleTodo, updateTodo, deleteTodo };
