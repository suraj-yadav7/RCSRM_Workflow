import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const mongo_uri = process.env.MONGO_URI
const connectDB = async()=>{
  try{
    const connectInstance = await mongoose.connect(mongo_uri, {
      dbName:"Flexi_db"
    })
    return connectInstance.connection.host
  }catch(error){
    throw error
  }
};

export default connectDB;