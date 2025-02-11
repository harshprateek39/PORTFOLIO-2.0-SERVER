import express from "express";
import {  EditHomeDescription, EditHomeImage, getHomeData } from "../Controllers/HomeController/HomeFunction.js";
const homeRoute =express.Router();
homeRoute.put('/image',EditHomeImage) ;
homeRoute.put('/description',EditHomeDescription);
homeRoute.get('/',getHomeData);
export default homeRoute;
