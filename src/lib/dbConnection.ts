import mongoose from "mongoose"
const dotenv = require("dotenv").config();

console.log('in file dbConnection.ts');

if (!process.env.MONGODB_CONNECTION_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

async function dbConnect() {
   console.log("in method dbConnet");
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  await mongoose.connect(process.env.MONGODB_CONNECTION_URI as string, opts as object).then(mongoose => {
    return mongoose
  }).catch(e=>{
    console.error(e);
  });
}

export default dbConnect;