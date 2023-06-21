const mongoose = require("mongoose");
const {Schema ,model} = mongoose;

export const post = new Schema({
    _id:Schema.Types.ObjectId,
    content:String,
    category:String,
    source:{type: Schema.Types.ObjectId, ref: 'user'},
    time:Date
});

export const postModel = new model("post",post);