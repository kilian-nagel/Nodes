require('dotenv').config()
const mongoose = require("mongoose");
const uri = process.env.MONGODB_CONNECTION_URI;

export let connection = false;

export default async function connectDb(){
    if(connection){
        return ;
    }

    const db = await mongoose.connect(uri);
    connection = db.connections[0].readyState;
};