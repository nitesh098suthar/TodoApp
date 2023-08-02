import express from "express";
import { changeController, editController, forgetController, getController, loginController, deleteController, logoutController, resetController, signupController } from "../controller/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const Router = express.Router();

Router.route("/me").get(authMiddleware, getController).put(authMiddleware, editController).delete(deleteController)
Router.route("/login").post(loginController)
Router.route("/register").post(signupController)
Router.route("/logout").get(authMiddleware, logoutController)
Router.route("/password/change").put(authMiddleware, changeController)
Router.route("/password/forget").post(forgetController)
Router.route("/password/reset/:token").put(resetController)

export default Router;
