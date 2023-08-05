import ErrorHandler from '../utils/ErrorHandler.js'
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler(401, "unauthorized user"));
  const isIdeal = jwt.verify(token, process.env.JWT_SECRET);
  if (!isIdeal) return next(new ErrorHandler(401, "unauthorized user"));
  //passing in isIdeal.idOfLoggedInUser Because idIdeal.idOfLoggedInUser isn't accessable in other files
  //req.id is accessable in all files
  req.id = isIdeal.id;
  next();
};
