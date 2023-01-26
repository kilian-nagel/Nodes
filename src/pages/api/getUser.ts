import connection from "./connection";
const mongoose = require("mongoose");

connection();

export async function getUser(username:String){
    await mongoose.find
    return {};
}