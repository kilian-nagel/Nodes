
export default interface userSchema {
    uid:string,
    username:string,
    picture:string,
    friends:Object[],
    messages:Object[],
    posts:Object[]
}