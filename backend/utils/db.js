// import mongoose from 'mongoose'
// import 'dotenv/config'
import mongoose from "mongoose";
import dotenv from "dotenv";


const MONGO_URL=process.env.URL

export async function connectDb() {
    try{
        await mongoose.connect(MONGO_URL)
        console.log("database connected")
    }
    catch{
        console.log("database not connected")
    }
}