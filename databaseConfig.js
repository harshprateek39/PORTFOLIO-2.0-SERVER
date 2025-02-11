import mongoose from "mongoose";
// ENV CONFIGURATION
import dotenv from 'dotenv';
dotenv.config();
const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
// CONNECTION



const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.kg4duyl.mongodb.net/portfolio?retryWrites=true&w=majority`
const Option = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}
export const dbConnection =()=>{
    try {
         mongoose.connect(URL,Option);
         mongoose.connection.on('connected', ()=>console.log("database Connected"));
         mongoose.connection.on('disconnected', ()=>console.log("database Disconnected"));
         mongoose.connection.on('error', console.error.bind(console, "connection error"));

    } catch (error) {
        console.log("error while connection data base ---> ", error.message);
    }
}