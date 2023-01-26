const mongoose = require("mongoose");
require('dotenv').config()
const uri = process.env.MONGODB_CONNECTION_URI;

export default async function connection(){
    await mongoose.connect(uri);
    console.log("connected");
};