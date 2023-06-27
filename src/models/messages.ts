import mongoose, { Document, Schema } from "mongoose";
import { userDocument } from "./users";

interface messageDocument extends Document {
    _id:string,
    content:string,
    source:userDocument,
    destination:userDocument,
    time:Date
}

const message = new Schema({
    _id:Schema.Types.ObjectId,
    content:String,
    source:{type:Schema.Types.ObjectId,ref:"user"},
    destination:{type:Schema.Types.ObjectId,ref:"user"},
    time:Date
})

const messageModel = mongoose.model<messageDocument>("message",message);
export default messageModel;