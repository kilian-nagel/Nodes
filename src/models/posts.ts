import { user } from "./users";
const mongoose = require("mongoose");
const {Schema ,model} = mongoose;

export const post = new Schema({
    content:String,
    category:String,
    source:user,
    time:Date
});

export const post_model = new model("post",post)