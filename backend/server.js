import dotenv from 'dotenv';
import express from 'express';
import app from './app.js';


import { connectDB } from './db/db.config.js';

dotenv.config();



connectDB().then(() =>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})

