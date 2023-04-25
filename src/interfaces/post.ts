import { userSchema } from "@/controllers/user"

export default interface postData{
    content:string,
    category:string,
    source:userSchema
    time:Date
}