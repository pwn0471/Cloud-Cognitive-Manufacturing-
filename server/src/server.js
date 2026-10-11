import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import machineRoutes from "./routes/machineRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/machines",machineRoutes);
app.use("/api/sensors", sensorRoutes);



// connect to mongoDB
connectDB();

app.get("/", (req, res)=>{
    res.json({
        success : true,
        message: "API is running "
    });
});

const PORT = process.env.PORT || 5000 ;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});