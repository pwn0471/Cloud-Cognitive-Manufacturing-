import express from "express";

import { generateAndSaveReading } from "../controllers/sensorController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:machineId/generate", authMiddleware, generateAndSaveReading);

export default router;