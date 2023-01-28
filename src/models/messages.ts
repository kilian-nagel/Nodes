import { userSchema } from "./users";
const mongoose = require("mongoose");
const {Schema , model } = mongoose;

export const message = new Schema({
    content:String,
    source:userSchema,
    destination:userSchema,
    time:Date
})

export const message_model = new model("message",message);