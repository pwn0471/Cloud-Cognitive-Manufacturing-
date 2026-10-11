import mongoose, { mongo } from "mongoose";

const machineSchema = new mongoose.Schema(
    {
        machineId:{
            type:String,
            required:true,
            uniqu:true,
            trim:true
        },

        name:{
            type: String,
            required:true,
            trim:true
        },
        type:{
            type:String,
            required:true,
            trim:true
        },
        location :{
            type:String,
            required:true,
            trim:true
        },
        status:{
            type:String,
            enum:["running", "idle","maintenance", "offline"],
            default:"offline"
        },

        temperature:{
            type:Number,
            required:true
        },
        vibration:{
            type:Number,
            required:true
        },

        rpm:{
            type:Number,
            required:true
        },

        operatingHours:{
            type:Number,
            required:true
        },
        healthScore:{
            type:Number,
            required:true,
            min:0,
            max:100
        },

        lastMaintenanceDate:{
            type:Date,
            required:true
        }
    },
    {
        timestamps:true
    }
);

const Machine = mongoose.model("Machine", machineSchema);

export default Machine;