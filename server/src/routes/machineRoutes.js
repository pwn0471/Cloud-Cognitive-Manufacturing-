
import express from "express";

import {
    createMachine,
    getMachines,
    getMachineById
} from "../controllers/machineControllers.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new machine
router.post("/", authMiddleware, createMachine);

// Get all machines
router.get("/", authMiddleware, getMachines);

// Get a single machine by machineId
router.get("/:machineId", authMiddleware, getMachineById);

export default router;
