const express=require("express");
const router=express.Router();
const Product=require("../models/product");
const Review=require("../models/review");

router.post("/products/:id/review",async (req,res)=>{
    
    try{
        const {id}=req.params;
        // console.log(id)
        const product=await Product.findById(id);
        const {rating,comment}=req.body;
        const review=new Review({rating,comment});
        product.reviews.push(review);
    
        await review.save();
        await product.save();
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render("error",{err:e.message})
    }
    
})


router.delete("/product/:id/:revid",async(req,res)=>{
 const {id,revid}=req.params;
 await Review.findByIdAndDelete(revid);
  req.flash("success","Review deleted successfully")
res.redirect(`/products/${id}`);
})
module.exports=router;