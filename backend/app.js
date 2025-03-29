import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import cors from 'cors';

const app = express();
// const app = express(); 
app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/users",userRouter);


export default app;