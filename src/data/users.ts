
interface obj<T>{
    [index:string]:T
}

interface user{
    uid:number,
    username:string,
    picture:string,
    friends:string[],
    messages:string[],
    posts:string[]
}

export const users:obj<user> = {
    0:{
        "uid":0,
        "username":"guest",
        "picture":"",
        "friends":[],
        "messages":[],
        "posts":["0"]
    }
}