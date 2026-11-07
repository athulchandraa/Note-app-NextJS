import mongoose from "mongoose";

require("node:dns/promises").setServers(["1.1.1.1","8.8.8.8"]);

const connectionString=process.env.DB_CONNECTION_STRING as string

export const connectDB=async()=>{
    try{
        const res=mongoose.connect(connectionString)

    }catch(err){
        console.log("DB Connection Failed !!");
        console.log(err)
    }
}