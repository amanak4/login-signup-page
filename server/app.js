import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userrouter from "./routes/userrouter.js";
import { dbConnect } from "./database/dbconnection.js";
import ErrHandler from "./middlewares/error.js";
const  app = express();
app.use(express.json());
dotenv.config({path:"./config/config.env"});

app.use(
    cors({
        origin:["http://localhost:3000"],
        methods:["GET","POST","DELETE","PUT"],
        credentials:true,
    })
);

app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


    app.use("/user",userrouter);
    dbConnect();

    app.use(ErrHandler);
export default app;