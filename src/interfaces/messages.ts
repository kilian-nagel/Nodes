import userSchema from "./user";

export default interface messageSchema {
    _id:string,
    content:string,
    source:userSchema,
    destination:userSchema,
    time:Date
}