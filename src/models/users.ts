const mongoose = require("mongoose");
const {Schema ,model} = mongoose;

export const userSchema = new Schema({
    _id:Schema.Types.ObjectId,
    username:String,
    picture:String,
    friends:[{ type: Schema.Types.ObjectId, ref: 'user' }],
    messages:[{ type: Schema.Types.ObjectId, ref: 'message' }],
    posts:[{ type: Schema.Types.ObjectId, ref: 'post' }],
})

export const userModel = new model("user",userSchema);