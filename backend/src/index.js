//import mongoose from "mongoose";
//import { DB_NAME } from "./constanst.js";
// require("dotenv").config({path: "./.env"});

import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });

const app = express();






















/* (async () => {
  try {
    await mongoose.connect( `${process.env.MONGO_URI}/${DB_NAME}`);
    app.on("error", (err) => {
      console.log("Error while connecting to database", err);
        throw err;
    })

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    })

    console.log("Database connected");
  } catch (error) {
    console.log("Error while connecting to database", error);
  } 
})(); */
