import { userSchema } from "@/interfaces/user";

export default interface postSchema {
    content:string,
    category:string,
    source:userSchema
    time:Date
}