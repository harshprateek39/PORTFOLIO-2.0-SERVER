import express from "express";
import authRoute from "./Routes/authRoutes.js";
import homeRoute from "./Routes/homeRoutes.js";
import aboutRoute from "./Routes/aboutRouter.js";
import { achievmentRoute, projectRoute } from "./Routes/projectRouter.js";
import { detailsRouter, messageRouter } from "./Routes/contactRouter.js";
const router =express.Router();
router.use("/auth", authRoute);
router.use("/home",homeRoute);
router.use("/about",aboutRoute);
router.use("/achievment", achievmentRoute );
router.use('/project',projectRoute)
router.use('/message',messageRouter)
router.use('/detail',detailsRouter)
export default router;
