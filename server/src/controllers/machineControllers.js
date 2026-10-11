import Machine from "../models/Machine.js";

export const createMachine = async(req,res)=>{
    try{
        const machine = await Machine.create(req.body);

        res.status(201).json({
            success:true,
            message:"Machine create successfully",
            machine
        });

    }catch(error){
        console.error("Created machine error:", error);

        res.status(500).json({
            success:false,
            message:"Failed to create machine"
        });
    }
};


export const getMachines = async(req,res)=>{
    try{
        const machines = await Machine.find();
        res.status(200).json({
            success:true,
            count:machines.length,
            machines
        });
    }catch(error){
        console.error("get machines error:", error);
    
        res.status(200).json({
            success:false,
            message:"Failed  to fetch machines"
        });
    }
};

export const getMachineById = async(req,res) =>{
    try{
        const machine = await Machine.findOne({
            machineId : req.params.machineId
        });

        if(!machine){
            return res.status(404).json({
                success :false,
                message : "Machine not found !"
            })
        }
        return res.status(200).json({
            success : true,
            machine
        });
    }catch(error){
        console.error("Get machine error :", error);

        return res.status(500).json({
            sucess : false,
            message : "Failed to fetch machine"
        });
    }
};