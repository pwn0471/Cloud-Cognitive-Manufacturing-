import express from "express";

import { 
    generateAndSaveReading ,
    getSensorHistory,
    analyzeMachineCondition,
    evaluateMachine,
    getMachineReactionHistory
} from "../controllers/sensorController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate and save a sensor reading 
router.post("/:machineId/generate", authMiddleware, generateAndSaveReading);


// Retrieve sensor history for a machine 
router.get("/:machineId", authMiddleware,getSensorHistory);

// Analyze the latest machine condition
router.get("/:machineId/condition", authMiddleware,analyzeMachineCondition);


// Complete machine evaluation: Perception + Decision Making
router.get("/:machineId/evaluate", authMiddleware, evaluateMachine);

// get updation history
router.get("/:machineId/reactions", authMiddleware, getMachineReactionHistory);
export default router;