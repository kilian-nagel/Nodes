const mongoose = require("mongoose");
const {Schema ,model} = mongoose;
import { userSchema } from "./users";

export const post = new Schema({
    content:String,
    category:String,
    source:userSchema,
    time:Date
});

export const postModel = new model("post",post);