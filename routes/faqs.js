const express=require("express");
const router=express.Router();
router.get("/faqs",async(req,res)=>{
    res.render("FAQS/faqs");   
})
module.exports=router;