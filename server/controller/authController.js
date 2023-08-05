import { catchAsyncError } from "../utils/catchAsyncError.js";
import { UserModel } from "../Model/Auth.js";
import { mailSender } from "../utils/mailSender.js";
import crypto from "crypto";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendToken } from "../utils/sendToken.js";

export const signupController = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return next(new ErrorHandler(401, "Fill all Fields"));
  const isValid = await UserModel.findOne({ email });
  if (isValid) return next(new ErrorHandler(401, "Wrong Credentials"));
  const newUser = await UserModel.create({ name, email, password });

  return sendToken(newUser, 201, "Signup Successfully", res);
});

export const loginController = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;
  const isAvailable = await UserModel.findOne({ email }).select("+password");

  if (!isAvailable) {
    return res.status(401).json({
      success: false,
      message: "wrong credentials",
    });
  }
  const isMatch = await isAvailable.comparePassword(password);
  if (!isMatch) return next(new ErrorHandler(401, "Wrong Credentials"));
  return sendToken(isAvailable, 200, "Login Successfully", res);
});

export const getController = catchAsyncError(async (req, res) => {
  const userId = req.id;
  if (!userId) return next(new ErrorHandler(401, "unauthorized user"));
  const user = await UserModel.findById(userId);
  if (!user) return next(new ErrorHandler(401, "unauthorized user"));
  res.status(200).json({
    success: true,
    user,
  });
});

export const editController = catchAsyncError(async (req, res) => {
  const userID = req.id;
  if (!userID) return next(new ErrorHandler(401, "unauthorized user"));
  const { name, email } = req.body;
  const loginUser = await UserModel.findById(userID);
  if (!loginUser) return next(new ErrorHandler(401, "unauthorized user"));
  if (email) {
    loginUser.email = email;
  }
  if (name) {
    loginUser.name = name;
  }
  await loginUser.save();
  return res.status(200).json({
    success: true,
    message: "profile updated",
  });
});

export const logoutController = catchAsyncError(async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
      secure: true,
      samesite: "none",
      httpOnly: true,
    })
    .json({
      success: true,
      message: "LoggedOut Successfully ",
    });
});

export const changeController = catchAsyncError(async (req, res) => {
  const userId = req.id;
  const { currentPassword, newPassword } = req.body;
  if (!userId) return next(new ErrorHandler(401, "unathorized user"));
  const user = await UserModel.findById(userId).select("+password");
  if (!user) return next(new ErrorHandler(401, "unauthorized user"));
  const checkPassword = await user.comparePassword(currentPassword);
  if (!checkPassword)
    return next(new ErrorHandler(401, "Current Password is wrong"));
  user.password = newPassword;
  await user.save();
  // await UserModel.findByIdAndUpdate(userId, {password})
  res.status(200).json({
    success: true,
    message: "Password Changed",
  });
});

export const forgetController = catchAsyncError(async (req, res) => {
  const { email } = req.body;

  const userAvailable = await UserModel.findOne({ email });

  if (!userAvailable) return next(new ErrorHandler(404, "user not found"));

  const token = crypto.randomBytes(10).toString("hex");

  const url = process.env.FRONTEND_URI + "/password/reset/" + token;

  const body = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
        body{
            background-color: black;
            color white;
        }
        </style>
        </head>
        <body>
            <a href=${url}>reset Password</a>
            <p>if not requested ignore</p>
        </body>
    </html>`;

  const subject = "Your reset Password Link";

  const isMailSent = await mailSender(email, subject, body);

  if (!isMailSent) return next(new ErrorHandler(401, "Unable to send Mail"));

  // userAvailable.resetToken = token;
  // userAvailable.resetTokenExpire = new Date(Date.now() + 5 * 60 * 1000)
  // await userAvailable.save();

  await UserModel.findByIdAndUpdate(userAvailable._id, {
    resetToken: token,
    resetTokenExpire: new Date(Date.now() + 5 * 60 * 1000),
  });

  return res.status(200).json({
    success: true,
    messaga: "mail send successfully",
  });
});

export const resetController = catchAsyncError(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await UserModel.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() },
  }).select("+password");
  if (!user)
    return next(new ErrorHandler(402, "Invalid or Expired Reset Token"));
  user.password = password;
  user.resetToken = null;
  user.resetTokenExpire = null;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "password changed successfully",
  });
});

export const deleteController = catchAsyncError(async (req, res) => {
  const { email, password } = req.body;
  const checkUser = await UserModel.findOne({ email }).select("+password");
  if (!checkUser) return next(new ErrorHandler(401, "unauthorized user"));
  const match = await checkUser.comparePassword(password);
  if (!match) return next(new ErrorHandler(401, "unauthorized user"));
  await checkUser.deleteOne();
  return res.status(200).json({
    success: true,
    messaga: "user deleted successfully",
  });
});
