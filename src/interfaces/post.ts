import userSchema from "@/interfaces/user";
import { ObjectId } from "mongodb";

export default interface postSchema {
    _id:ObjectId,
    content:string,
    category:string,
    source:userSchema,
    time:Date
}