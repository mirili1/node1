import express from "express";
import { config } from "dotenv";
import {connectToDB} from "./config/dbConfig.js"
import bookRouter from "./routes/book.js"; 
import userRouter from "./routes/user.js"; 
import morgan from "morgan";
import errorHandler from "./controllers/errorHandler.js";
import cors from 'cors'
config();
connectToDB();
const app=express();
app.use(cors({ origin: "http://localhost:6000" }));
app.use(morgan("common"));
app.use(express.json());
app.use(express.static('images'));
app.use("/api/books",bookRouter);
app.use("/api/users",userRouter);
app.use(errorHandler)
let port=process.env.PORT||6000
app.listen(port,()=>{
    console.log("listening on port "+port);
})
 