import express from "express";
import {loginUser ,signupUser} from "../controllers/auth.controlller.js"
import {auth,isAdmin,isStudent} from "../middleware/auth.middleware.js"  
const router =express.Router();

router.post("/login",loginUser);
router.post("/signup", signupUser);


//Protected routes

router.get("/test", auth,(req,res)=>{
  res.send("Hello from protected route");
})

router.get("/student", auth, isStudent, (req, res) => {
  return res.json({
    message: "Welcome Student",
  });
});

router.get("/admin", auth, isAdmin, (req,res) => {
  return res.json({
    message: "Welcome Admin",
  });
});


export default router ;