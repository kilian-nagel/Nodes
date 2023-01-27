import { Model } from "mongoose";

const mongoose = require("mongoose");
const {Schema ,model} = mongoose;

export const user = new Schema({
    uid:String,
    name:String,
    picture:String,
    friends:[Object],
    message:[Object],
})

module.exports = mongoose.models.user || mongoose.model("user",user);