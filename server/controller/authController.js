import bcrypt from "bcryptjs/dist/bcrypt.js";
import { UserModel } from "../Model/Auth.js";
import { mailSender } from "../utils/mailSender.js";
import crypto from "crypto";

export const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(404).json({
        success: false,
        message: "Fill all fields",
      });
    }

    const isValid = await UserModel.findOne({ email });

    if (isValid) {
      return res.status(401).json({
        success: false,
        message: "Wrong Credentials",
      });
    }

    const newUser = await UserModel.create({ name, email, password });

    const token = newUser.genToken();

    //token = long dangerous cookie

    return res
      .status(201)
      .cookie("token", token, {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "SignUp Successfully",
      });
  } catch (e) {
    return res.status(401).json({
      success: false,
      error: e.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body; //nitesh098suthar@gmial.com 99999
    console.log(email, password);
    const isAvailable = await UserModel.findOne({ email }).select("+password");

    if (!isAvailable) {
      return res.status(401).json({
        success: false,
        message: "wrong credentials",
      });
    }
    const isMatch = await isAvailable.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "wrong credentials",
      });
    }

    const token = isAvailable.genToken();

    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 32 * 24 * 60 * 60 * 1000),
        secure: true,
        httpOnly: true,
        sameSite: "none",
      })
      .json({
        success: true,
        message: "Logged in Successfully",
      });
  } catch (e) {
    console.log(e);
    // return res.status(401).json({
    //     success: false,
    //     error: e
    // })
  }
};

export const getController = async (req, res) => {
  const userId = req.id;
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }

  res.status(200).json({
    success: true,
    user,
  });
};

export const editController = async (req, res) => {
  const userID = req.id;
  if (!userID) {
    return res.status(401).json({
      success: false,
      message: "unauthorized user",
    });
  }

  const { name, email } = req.body;

  const loginUser = await UserModel.findById(userID);

  if (!loginUser) {
    return res.status(401).json({
      success: false,
      message: "unauthorized user",
    });
  }

  if (email) {
    loginUser.email = email;
  }
  if (name) {
    loginUser.name = name;
  }

  // await UserModel.findByIdAndUpdate(userID, {name, email})
  await loginUser.save();

  return res.status(200).json({
    success: true,
    message: "profile updated",
  });
};

export const logoutController = async (req, res) => {
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
};

export const changeController = async (req, res) => {
  const userId = req.id;
  const { currentPassword, newPassword } = req.body;

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }

  const user = await UserModel.findById(userId).select("+password");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized User",
    });
  }

  const checkPassword = await user.comparePassword(currentPassword);

  if (!checkPassword) {
    return res.status(401).json({
      success: false,
      message: "Current password is wrong",
    });
  }

  user.password = newPassword;

  await user.save();

  // await UserModel.findByIdAndUpdate(userId, {password})

  res.status(200).json({
    success: true,
    message: "Password Changed",
  });
};

export const forgetController = async (req, res) => {
  const { email } = req.body;

  const userAvailable = await UserModel.findOne({ email });

  if (!userAvailable) {
    return res.status(404).json({
      success: false,
      message: "not an user",
    });
  }

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

  if (!isMailSent) {
    return res.status(401).json({
      success: false,
      message: "Mail is not send successfully",
    });
  }
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
};
export const resetController = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await UserModel.findOne({
    resetToken: token,
    resetTokenExpire: { $gt: Date.now() },
  }).select("+password");
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "not an user",
    });
  }

  user.password = password;
  user.resetToken = null;
  user.resetTokenExpire = null;
  await user.save();
  return res.status(200).json({
    success: true,
    message: "password changed successfully",
  });
};

export const deleteController = async (req, res) => {
  const { email, password } = req.body;

  const checkUser = await UserModel.findOne({ email }).select("+password");

  if (!checkUser) {
    return res.status(401).json({
      success: false,
      message: "unauthorized user",
    });
  }

  const match = await checkUser.comparePassword(password);

  if (!match) {
    return res.status(401).json({
      success: false,
      message: "unauthorized user",
    });
  }

  await checkUser.deleteOne();

  return res.status(200).json({
    success: true,
    messaga: "user deleted successfully",
  });
};
