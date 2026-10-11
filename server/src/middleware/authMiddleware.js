import jwt from "jsonwebtoken";

const authMiddleware = (req,res, next )=>{
    try{
        console.log("ALL HEADERS:", req.headers);
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader);

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({
                success:false,
                message:"Authenticaiton required"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    }catch(error){
        return res.status(401).json({
            success:false,
            message :"Invalid or expired token"
        });
    }
};

export default authMiddleware;