import axios from "axios";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router.js";
import ConnectMongoDBSession from "connect-mongodb-session";
import cookieParser from "cookie-parser";
import { dbConnection } from "./databaseConfig.js";
import bodyParser from "body-parser";
import session from "express-session";
import { sessionAuthChecker } from "./middleware/sessionAuth.js";
dotenv.config()
const MongoDBStore = ConnectMongoDBSession(session);
const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = [
    "http://localhost:3000",
    "https://your-frontend-domain.com",
    "https://another-frontend.com",
    "null"
];
app.use(cors(
    {
        origin: (origin, callback) => {
            console.log("Request Origin:", origin);
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
credentials:true}
));
dbConnection();
const store =new MongoDBStore({
    uri:`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.kg4duyl.mongodb.net/portfolio?retryWrites=true&w=majority`,
    collection:"session"
})
app.use(session({
    key:'user_sID',
    secret:'apple',
    resave:false,
    saveUninitialized:false,
    cookie:{secure:false,maxAge:30000000},
    store:store
}));
app.use(express.json({limit:"30mb"}));
app.get('/',(req,res)=>{
  res.send("Working  perfectly fine");
})
app.use( '/api/v1',router);
app.get('/verify',sessionAuthChecker,(req,res)=>{
    res.status(200).json({ message: 'Authorised' ,success:true});
});
app.get('/logout',(req,res)=>{  
    req.session.destroy();
    res.send("logout");
})




app.listen( 8000, ()=>{console.log("server started at 8000" );})