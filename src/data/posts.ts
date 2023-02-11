
interface obj<T>{
    [index:string]:T
}

interface post{
    category:string,
    content:string,
    source:string,
    time:string
}

export const posts:obj<post> = {
    "0":{
        category:"",
        content:"Hello i'm a new user",
        source:"0",
        time:""
    },
    "1":{
        category:"",
        content:"Javascript is a cool language",
        source:"0",
        time:""
    },
    "2":{
        category:"",
        content:"Hi",
        source:"0",
        time:""
    },
    "3":{
        category:"",
        content:"Dogs are better than cats",
        source:"0",
        time:""
    }
}