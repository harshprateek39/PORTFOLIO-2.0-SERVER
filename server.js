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

dotenv.config();

const MongoDBStore = ConnectMongoDBSession(session);
const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;

const app = express();

// ✅ 1. Use dynamic `secure` setting based on environment
const isProduction = true;

// ✅ 2. Body Parser & Cookie Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ 3. CORS Configuration (Allow Cookies)
const allowedOrigins = [
    "http://localhost:3000",
    "https://your-frontend-domain.com",
    "https://another-frontend.com",
    "null",
    "https://portfolio-2-0-admin.vercel.app"
];

app.use(cors({
    origin: (origin, callback) => {
        console.log("Request Origin:", origin);
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

// ✅ 4. Connect MongoDB Before Using Session Store
dbConnection();

const store = new MongoDBStore({
    uri: `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.kg4duyl.mongodb.net/portfolio?retryWrites=true&w=majority`,
    collection: "session"
});

store.on("error", (error) => {
    console.error("Session store error:", error);
});

// ✅ 5. Use `proxy: true` in production to trust Vercel proxy
app.set("trust proxy", 1);

app.use(session({
    key: 'user_sID',
    secret: 'apple',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: isProduction,  // ✅ Secure cookies only in production
        maxAge: 30000000,
        sameSite: "none",
        httpOnly: true
    }
}));

// ✅ 6. Express Middleware
app.use(express.json({ limit: "30mb" }));

// ✅ 7. Routes
app.get('/', (req, res) => {
    res.send("Working perfectly fine");
});

app.use('/api/v1', router);

app.get('/verify', sessionAuthChecker, (req, res) => {
    if (!req.session) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
    res.status(200).json({ message: "Authorised", success: true });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.clearCookie("user_sID", { path: "/", httpOnly: true, secure: isProduction, sameSite: "none" });
    res.send("logout");
});

// ✅ 8. Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
