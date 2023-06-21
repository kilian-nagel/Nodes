const mongoose = require("mongoose");
const {Schema} = mongoose;

export const userSchema = new Schema({
    _id:Schema.Types.ObjectId,
    username:String,
    picture:String,
    friends:[{ type: Schema.Types.ObjectId, ref: 'user' }],
    messages:[{ type: Schema.Types.ObjectId, ref: 'message' }],
    posts:[{ type: Schema.Types.ObjectId, ref: 'post' }],
})

export const userModel = mongoose.models.User || mongoose.model('User', userSchema);