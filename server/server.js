import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000 ;

// connect to mongoDB
connectDB();

app.get("/", (req, res)=>{
    res.json({
        success : true,
        message: "API is running "
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});