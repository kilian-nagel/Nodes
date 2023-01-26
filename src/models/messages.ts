import { user } from "./users";
const mongoose = require("mongoose");
const {Schema ,model} = mongoose;

export const message = new Schema({
    content:String,
    source:user,
    destination:user,
    time:Date
})

export const message_model = new model("message",message);