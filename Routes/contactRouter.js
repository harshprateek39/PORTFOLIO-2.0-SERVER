import express from "express";
import { createMessage, deleteMessage, getMessage } from "../Controllers/ContactController/messageFunction.js";
import { createDetail, editDetail } from "../Controllers/ContactController/detailsFunction.js";
const messageRouter=express.Router();
const detailsRouter=express.Router();
messageRouter.post('/', createMessage);
messageRouter.delete('/:id', deleteMessage);
messageRouter.get("/",getMessage);
detailsRouter.post('/',createDetail).put('/',editDetail);

export {messageRouter,detailsRouter};