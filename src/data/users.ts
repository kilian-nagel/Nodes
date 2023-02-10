
interface obj<T>{
    [index:string]:T
}

export const users:obj<object> = {
    0:{
        "uid":0,
        "username":"guest",
        "picture":"",
        "friends":[],
        "messages":[],
        "posts":["0"]
    }
}