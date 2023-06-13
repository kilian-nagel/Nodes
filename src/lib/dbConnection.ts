import { DbConnectionError } from "@/errors/utilityErrors";
import mongoose from "mongoose"
const dotenv = require("dotenv").config();

if (!process.env.MONGODB_CONNECTION_URI) {
  throw new DbConnectionError(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

async function dbConnect() {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  await mongoose.connect(process.env.MONGODB_CONNECTION_URI as string, opts as object).then(mongoose => {
    return mongoose
  }).catch((err:Error)=>{
    throw new DbConnectionError(err.message)
  });
}

export default dbConnect;