
import Machine from "../models/Machine.js";
import SensorData from "../models/SensorData.js";
import { generateSensorReading } from "../services/sensorSimulator.js";
import { classifyMachineCondition } from "../services/perceptionService.js";
import { makeMachineDecision } from "../services/decisionService.js";
import { generateMachineReaction } from "../services/reactionService.js";
import MachineReaction from "../models/MachineReaction.js";

export const generateAndSaveReading = async (req, res) => {
    try {
        const { machineId } = req.params;

        // Check whether the machine exists
        const machine = await Machine.findOne({ machineId });

        if (!machine) {
            return res.status(404).json({
                success: false,
                message: "Machine not found"
            });
        }

        // Generate simulated sensor data
        const reading = generateSensorReading(machineId);

        // Save the reading in MongoDB
        const savedReading = await SensorData.create(reading);

        return res.status(201).json({
            success: true,
            message: "Sensor reading generated and saved successfully",
            reading: savedReading
        });
    } catch (error) {
        console.error("Generate sensor reading error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate and save sensor reading"
        });
    }
};


export const getSensorHistory = async (req, res) => {
    try {
        const { machineId } = req.params;

        // Check whether the machine exists
        const machine = await Machine.findOne({ machineId });

        if (!machine) {
            return res.status(404).json({
                success: false,
                message: "Machine not found"
            });
        }

        // Retrieve sensor readings, newest first
        const readings = await SensorData.find({ machineId })
            .sort({ timestamp: -1 });

        return res.status(200).json({
            success: true,
            count: readings.length,
            readings
        });
    } catch (error) {
        console.error("Get sensor history error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch sensor history"
        });
    }
};


export const analyzeMachineCondition = async (req, res) => {
    try{
        const {machineId} = req.params;

        // verify that the machine exits
        const machine = await Machine.findOne({machineId});

        if(!machine){
            return res.status(404).json({
                success : false,
                message : "Machine not found"
            });

        }

        // retrieve the latest sensor reding 
        const latesReading = await SensorData.findOne({machineId}).sort({timestamp:-1});

        if(!latesReading){
            return res.status(404).json({
                success : false,
                message : " No sonsor reading found for this machine"
            });
        }

        // analyze the senosor rading 
        const analysis = classifyMachineCondition(latesReading);
        return res.status(200).json({
            success : true,
            machineId,
            reading : latesReading,
            analysis
        });

    }catch{
        console.error("Machine conditio analysis error :", error);

        return res.status(500).json({
            success: false,
            message : "failed to analyze machine condition"
        });

    }
};


export const evaluateMachine = async (req, res) => {
    try {
        const { machineId } = req.params;

        // Verify that the machine exists
        const machine = await Machine.findOne({ machineId });

        if (!machine) {
            return res.status(404).json({
                success: false,
                message: "Machine not found"
            });
        }

        // Get the latest sensor reading
        const latestReading = await SensorData.findOne({ machineId })
            .sort({ timestamp: -1 });

        if (!latestReading) {
            return res.status(404).json({
                success: false,
                message: "No sensor readings found for this machine"
            });
        }

        // SEE: Perception
        const analysis = classifyMachineCondition(latestReading);

        // THINK: Decision-making
        const decision = makeMachineDecision(analysis);

        const reaction = generateMachineReaction(decision);

        const savedReaction = await MachineReaction.create({
            machineId,
            condition: analysis.condition,
            riskLevel: decision.riskLevel,
            decision: decision.decision,
            reactionType: reaction.reactionType,
            status: reaction.status,
            message: reaction.message
        });

        // ACT: rreaction
        return res.status(200).json({
            success: true,
            machineId,
            reading: latestReading,
            analysis,
            decision,
            reaction:savedReaction
        });
    } catch (error) {
        console.error("Machine evaluation error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to evaluate machine"
        });
    }
};



export const getMachineReactionHistory = async (req, res) => {
  try {
    const { machineId } = req.params;

    const machine = await Machine.findOne({ machineId });

    if (!machine) {
      return res.status(404).json({
        success: false,
        message: "Machine not found"
      });
    }

    const reactions = await MachineReaction.find({ machineId })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      machineId,
      count: reactions.length,
      reactions
    });
  } catch (error) {
    console.error("Reaction history error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch machine reaction history"
    });
  }
};
