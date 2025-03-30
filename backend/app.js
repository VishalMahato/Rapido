import express from "express";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import cors from 'cors';
import captainRouter from "./routes/captain.route.js";

const app = express();
// const app = express(); 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
  

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/users",userRouter);
app.use("/api/v1/captain",captainRouter);


export default app;