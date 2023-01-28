const mongoose = require("mongoose");
const {Schema,model} = mongoose;

export const userSchema = new Schema({
    uid:String,
    username:String,
    picture:String,
    friends:[Object],
    messages:[Object],
    posts:[Object]
})

module.exports = mongoose.models.users || model("users",userSchema);