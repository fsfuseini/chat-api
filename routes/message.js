import { Router } from "express";
import { editMessage, sendMessage, deleteMessage, getAllMessages } from "../controllers/message.js";


const messageRouter = Router();

// Send message
messageRouter.post("/message", sendMessage)

// Edit message
messageRouter.patch("/message/:id", editMessage)

// Delete message
messageRouter.delete("/message/:id", deleteMessage)
// Get all messages
messageRouter.get("/messages", getAllMessages)

export default messageRouter;