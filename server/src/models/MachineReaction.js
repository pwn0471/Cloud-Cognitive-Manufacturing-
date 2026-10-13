
import mongoose from "mongoose";

const machineReactionSchema = new mongoose.Schema(
  {
    machineId: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    condition: {
      type: String,
      enum: ["NORMAL", "WARNING", "CRITICAL"],
      required: true
    },

    riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "UNKNOWN"],
      required: true
    },

    decision: {
      type: String,
      required: true
    },

    reactionType: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["COMPLETED", "PENDING"],
      default: "PENDING"
    },

    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const MachineReaction = mongoose.model(
  "MachineReaction",
  machineReactionSchema
);

export default MachineReaction;
