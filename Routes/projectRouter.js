import express from "express";
import { createAchievment, deleteAchievment, editAchievment, getAchievements } from "../Controllers/AchievmentController/AchievmentFunction.js";
import { createProject, deleteProject, editProject, getProjects } from "../Controllers/ProjectController/ProjectFunction.js";
const achievmentRoute= express.Router();
const projectRoute= express.Router();

achievmentRoute.post('/',createAchievment);
achievmentRoute.put('/',editAchievment);
achievmentRoute.delete('/',deleteAchievment);
achievmentRoute.get('/',getAchievements);
projectRoute.post('/', createProject);
projectRoute.put('/', editProject);
projectRoute.get('/', getProjects);
projectRoute.delete('/', deleteProject);
export {achievmentRoute,projectRoute};