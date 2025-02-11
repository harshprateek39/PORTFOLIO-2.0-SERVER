import express from "express";
import { EditAboutDescription, EditAboutSkills, getAbout } from "../Controllers/AboutController/aboutFunction.js";

const aboutRoute =express.Router();
aboutRoute.put('/description', EditAboutDescription);
aboutRoute.put('/skills',EditAboutSkills)
aboutRoute.get("/" , getAbout);
export default aboutRoute;
  