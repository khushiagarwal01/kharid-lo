const express=require("express");
const router=express.Router();
router.get("/customersignup",async(req,res)=>{
    res.render("customersignup/customersign");   
})
module.exports=router;