import { messageModel } from "../models/message.js";

export const sendMessage = async (req, res) => {
    const { sender, message } = req.body;
    const newMessage = new messageModel({ sender, message });
    await newMessage.save();
    res.send(newMessage);
}


export const editMessage = async (req, res) => {
    const { id } = req.params;
    const { sender, message } = req.body;
    const updatedMessage = await messageModel.findOneAndUpdate({ _id: id }, { sender, message });
    res.send(updatedMessage);
}


export const deleteMessage = async (req, res) => {  
    const { id } = req.params;  
    const deletedMessage = await messageModel.findOneAndDelete({ _id: id });
    res.send(deletedMessage);
}

export const getAllMessages = async (req, res) => {
    const messages = await messageModel.find();
    res.send(messages);
}
