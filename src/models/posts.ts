import userSchema from "@/interfaces/user";
import mongoose, { Document, Schema } from "mongoose";

interface postDocument extends Document {
    id:string,
    content:string,
    category:string,
    source:userSchema,
    time:Date
}

const post = new Schema<postDocument>({
    _id:Schema.Types.ObjectId,
    content:String,
    category:String,
    source:{type: Schema.Types.ObjectId, ref: 'user'},
    time:Date
});

const postModel = mongoose.model<postDocument>("post",post);
export default postModel;