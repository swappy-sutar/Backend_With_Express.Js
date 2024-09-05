import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"


const auth = asyncHandler(async (req, res, next) => {

    console.log("body", req.body.token);
    console.log("cookies", req.cookies.token);
    console.log("Header", req.header("Authorization"));

    
    const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer " , "");

    if (!token) {
        return res.status(401).json({ 
            success:false,
            message: "Access denied. No token provided." 
        });
    }

    const decodetoken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    console.log(decodetoken);
    req.user = decodetoken;
   
next();
})


const  isStudent = asyncHandler(async (req,res,next)=>{
    if (req.user.role !== "Student") {
        return res.status(401).json({
            success: false,
            message: "Access denied. You are not an Student"
        });    
    }
    next();
})


const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "Admin") {
        return res.status(401).json({
            success: false,
            message: "Access denied. You are not an Admin"
        });
    }
    next();
});



export { auth, isAdmin, isStudent };

