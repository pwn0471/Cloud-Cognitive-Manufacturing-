
import Machine from "../models/Machine.js";
import SensorData from "../models/SensorData.js";
import { generateSensorReading } from "../services/sensorSimulator.js";

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
