import express from "express";
import { register, resetPassword } from "../Controllers/AuthController/registrationRouter.js";
import { login,logout } from "../Controllers/AuthController/loginRouter.js";
const authRoute =express.Router();
authRoute.post("/register",register);
authRoute.post("/reset",resetPassword);
authRoute.post("/login",login);
authRoute.post("/logout",logout);
export default authRoute;
