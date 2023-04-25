const mongoose = require("mongoose");
const {Schema , model } = mongoose;
import { userSchema } from "./users";

export const message = new Schema({
    content:String,
    source:userSchema,
    destination:userSchema,
    time:Date
})

export const messageModel = new model("message",message);