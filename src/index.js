import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Load environment variables

import express from 'express';
import connectDB from './db/index.js'; // Import connectDB function

const app = express();

// Call the function to connect to the database
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});





/*
import express from "express"
const app=express()

(async ()=>{
    try{
      await mongoose.connect(`${process.env.MONGODB_URL}/${db_name}`)
      app.on("error",(error)=>{
        console.log("ERRR",error);
        throw error
      })

      app.listen(process.env.PORT,()=>{
        console.log(`APP IS LISTENING ON ${process.env.PORT}`);
      })

    }catch{
        console.log("ERROR",error)
        throw err
    }
})()
*/

