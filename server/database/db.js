import mongoose from "mongoose";

const Connection = async(username,password) =>{
    const URL = `mongodb://user:codeforinterview@blog-app-shard-00-00.1ifju.mongodb.net:27017,blog-app-shard-00-01.1ifju.mongodb.net:27017,blog-app-shard-00-02.1ifju.mongodb.net:27017/?ssl=true&replicaSet=atlas-opfe8a-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`;
    try{
            await mongoose.connect(URL);
            console.log("database connected succesfully");

    }catch(error){
           console.log('Error while connecting to the database',error);
    }
}
export default Connection;
