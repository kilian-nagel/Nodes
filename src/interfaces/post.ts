import userSchema from "@/interfaces/user";

export default interface postSchema {
    _id:string,
    content:string,
    category:string,
    source:userSchema,
    time:Date
}