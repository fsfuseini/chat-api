import { Schema, model } from "mongoose";



const messageSchema = new Schema({
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },

});

export const messageModel = model("Message", messageSchema);
