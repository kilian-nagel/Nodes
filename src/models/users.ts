import { Model } from "mongoose";

const mongoose = require("mongoose");
const {Schema ,model} = mongoose;

export const user = new Schema({
    uid:String,
    name:String,
    picture:String,
    friends:Object[],
    message:Object[],
})

export const user_model = new Model("user",user);