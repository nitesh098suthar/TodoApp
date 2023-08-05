import { UserModel } from "../Model/Auth.js";
import { TaskModel } from "../Model/Task.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";

export const addController = catchAsyncError(async (req, res) => {
  const { title, description } = req.body;
  const user = await UserModel.findById(req.id);
  if (!user) return next(new ErrorHandler(401, "unauthorized user"));
  await TaskModel.create({ title, description, userID: user._id });
  return res.status(201).json({
    success: true,
    message: "task created",
  });
});

export const updateController = catchAsyncError(async (req, res) => {
  const userID = req.id;
  const taskId = req.params.id;
  const { title, description } = req.body;
  const userAvailable = await UserModel.findById(userID);
  if (!userAvailable) return next(new ErrorHandler(401, "unauthorized user"));
  await TaskModel.findOneAndUpdate(
    { userID, _id: taskId },
    { title, description }
  );
  return res.status(200).json({
    success: true,
    message: "task updated",
  });
});

export const deleteController = async (req, res) => {
  const userID = req.id;
  const user = await UserModel.findById(userID);
  if (!user) return next(new ErrorHandler(401, "unauthorized to delete task"));
  const taskID = req.params.id;
  const currTask = await TaskModel.findById(taskID);
  if (!currTask) return next(new ErrorHandler(404, "Task not found"));
  await currTask.deleteOne();
  return res.status(200).json({
    success: true,
    message: "task deleted",
  });
};

export const getController = catchAsyncError(async (req, res) => {
  const userID = req.id;
  const currentUser = await UserModel.findById(userID);
  if (!currentUser)
    return next(new ErrorHandler(401, "unauthrized user to view tasks"));
  let tasks = await TaskModel.find({ userID });
  tasks = tasks.reverse();
  return res.status(200).json({
    success: true,
    tasks,
  });
});

export const getSingleTask = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  if (!id) return next(new ErrorHandler(404, "Task not found"));
  const task = await TaskModel.findById(id);
  if (!task) return next(new ErrorHandler(404, "Task not found"));
  return res.status(200).json({ success: true, task });
});
