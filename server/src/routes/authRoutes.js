import express from "express";

import { registerUser,loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/protected", authMiddleware,(req,res) =>{
    res.json({
        success:true,
        message:true,
        message:"you have access to a procted route",
        user:req.user

    });
});
export default router;