import { ObjectId } from "mongodb";
import userSchema from "./user";

export interface postSchema {
    _id:ObjectId,
    content:string,
    category:string,
    source:ObjectId,
    time:Date
}

export interface postSchemaRaw {
    _id:ObjectId,
    content:string,
    category:string,
    source:string,
    time:Date
}

export interface postSchemaPopulated {
    _id:ObjectId,
    content:string,
    category:string,
    source:userSchema,
    time:Date
}