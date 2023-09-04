import { ObjectId } from "mongodb";
import userSchema from "./user";

export default interface messageSchema {
    _id:ObjectId,
    content:string,
    source:userSchema,
    destination:userSchema,
    time:Date
}