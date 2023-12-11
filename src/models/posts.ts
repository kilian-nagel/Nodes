import { ObjectId } from "mongodb";
import mongoose, { Document, Schema } from "mongoose";

export interface postDocument extends Document {
    id:string,
    content:string,
    category:string,
    source:ObjectId,
    time:Date
}

const post = new Schema<postDocument>({
    _id:Schema.Types.ObjectId,
    content:{
        type:String,
        index:true
    },
    category:String,
    source:{type: Schema.Types.ObjectId, ref: 'users'},
    time:Date
});

const postModel = mongoose.models.post || mongoose.model<postDocument>("post",post);
export default postModel;