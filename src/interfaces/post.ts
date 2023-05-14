import { userSchema } from "@/interfaces/user";

export default interface postSchema {
    uid:string,
    content:string,
    category:string,
    source:userSchema,
    time:Date
}