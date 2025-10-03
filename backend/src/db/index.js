import mongoose from "mongoose";
import { DB_NAME } from "../constanst.js";


const connectDB = async () => {
  try {
    const connectionInstance=await mongoose.connect( `${process.env.MONGO_URI}/${DB_NAME}`);     
    // console.log("Database connected");
    console.log(`\nMongoDB connected !! DB host : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MONGODB Connection error : ", error);
    process.exit(1);
  } 
};
export default connectDB;
