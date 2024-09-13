const express=require("express");
const router=express.Router();
router.get("/vendorSignup",async(req,res)=>{
    res.render("vendorSignup/vendorsignup");   
})
module.exports=router;