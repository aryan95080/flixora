//import mongoose from "mongoose";
//import { DB_NAME } from "./constanst.js";
// require("dotenv").config({path: "./.env"});

import dotenv from "dotenv";
import { app } from "./app.js";      // ✅ use the app that has all your routes
import connectDB from "./db/index.js";

dotenv.config({ path: "./.env" });   // ✅ usually the file name is .env (not env)

// Connect to database and then start the server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MONGO DB connection failed!!", err);
  });






















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
