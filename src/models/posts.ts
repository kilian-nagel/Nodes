import { userSchema } from "./users";
const mongoose = require("mongoose");
const {Schema ,model} = mongoose;

export const post = new Schema({
    content:String,
    category:String,
    source:userSchema,
    time:Date
});

export const post_model = new model("post",post);