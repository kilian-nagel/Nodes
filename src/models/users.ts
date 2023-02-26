const mongoose = require("mongoose");
const {Schema} = mongoose;

export const userSchema = new Schema({
    uid:String,
    username:String,
    picture:String,
    friends:[Object],
    messages:[Object],
    posts:[Object]
})

export const userModel = mongoose.models.User || mongoose.model('User', userSchema);