import mongoose from "mongoose";

const sensorDataSchema = new mongoose.Schema(
    {
        machineId :{
            type : String,
            required : true,
            trim : true,
            index : true
        },

        temperature:{
            type : Number,
            required : true,

        },
        vibration :{
            type : Number,
            requires : true
        },

        pressure: {
            type : Number,
            required : true,
        },

        rpm :{
            type : Number,
            required : true
        },

        source:{
            type : String,
            enum : ["simulated", "physical"],
            defualt : "simulated"
        },

        timestamp :{
            type : Date,
            default : Date.now
        }
    },
    {
        timestamps : true
    }
);

const sensorData = mongoose.model(
    "SensorData",
    sensorDataSchema
);
export default sensorData;