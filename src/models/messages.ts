const mongoose = require("mongoose");
const {Schema , model } = mongoose;

export const message = new Schema({
    _id:Schema.Types.ObjectId,
    content:String,
    source:{type:Schema.Types.ObjectId,ref:"user"},
    destination:{type:Schema.Types.ObjectId,ref:"user"},
    time:Date
})

export const messageModel = new model("message",message);