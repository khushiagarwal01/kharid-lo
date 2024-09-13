const express=require("express");
const router=express.Router();
const Product=require("../models/product");
const {  isLoggedIn  , isSeller} = require('../middleware');
//All
router.get("/products",async(req,res)=>{
    try{
        const products=await Product.find({});
        res.render("products/index",{products});
    }catch(e){
        res.status(500).render("error");
    }
})

//Single
router.get("/products/:id",isLoggedIn,async(req,res)=>{
    try{
        const {id}=req.params

        const product=await Product.findById(id).populate('reviews');
        const index=product.name.indexOf(" ");
        const nameP=index>0?product.name.substring(0,index):product.name.substring(0);
        const products = await Product.find({ name:
            {
            $regex: nameP,
            $options: "i"
            } ,
            _id:{$ne:id}
    });    
        res.render('products/show',{product,products});
    }
    catch(e){
        res.status(500).render("error");
    }
});

//Edit
router.get("/product/:id/edit",isLoggedIn,async(req,res)=>{
    try{
        const{id}=req.params;
        const product=await Product.findById(id);
        res.render("products/edit",{product});
    }
    catch(e){
        res.status(500).render("error",{err:e.message})
    }
});

router.patch("/product/:id", isLoggedIn,  async(req,res)=>{
    const{name,img2,img1,img3,price,desc}=req.body;
    try{
        const{id}=req.params;
        var img=[img1,img2,img3];
        await Product.findByIdAndUpdate(id,{name,img,price,desc});
        res.redirect("/products")

    }
    catch(e){
        res.status(500).render("error",{err:e.message})
    }
})
//New
router.get("/product/new", isLoggedIn, isSeller,async(req,res)=>{
    res.render("products/new")
})

router.post("/product/new", isLoggedIn, isSeller,async(req,res)=>{
    const{name,img2,img1,img3,price,desc}=req.body;
    try{
        var img=[img1,img2,img3];
        await Product.create({name,img,price,desc});
        res.redirect("/products")
    }
    catch(e){
        res.status(500).render("error",{err:e.message})
    }
})
//Delete
router.delete("/product/:id", isLoggedIn,async(req,res)=>{
    try{
        const {id}=req.params;    
        await Product.findByIdAndDelete(id);
        res.redirect("/products");
    }
    
    catch(e){
        res.status(500).render("error",{err:e.message})
    }
})



//Search

router.post("/search", async (req, res) => {
    const { value } = req.body; // Change this line
    if (!value) {
      return res.status(400).send("Value is required");
    }
    const products = await Product.find({ name:{
        $regex: value,
        $options: "i"
    } });

    console.log(products);
    res.render("products/val", { products });
  });


router.get("/price-low-to-high",async(req,res)=>{
    const query = {};
    const sort = { price: 1 };
    const products=await Product.find(query).sort(sort)
    
// sort in ascending (1) order by length


    res.render("products/val", { products });
})

router.get("/price-high-to-low",async(req,res)=>{
    const query = {};
    const sort = { price:-1 };
    const products=await Product.find(query).sort(sort)
    
// sort in ascending (1) order by length


    res.render("products/val", { products });
})

//Sharing Route
router.post('/share-product-via-whatsapp', (req, res) => {
    const productId = req.body.productId;
    // Construct the product URL
    const productUrl = `http://localhost:4000/products/${productId}`;
    // Construct the WhatsApp share link
    const whatsappShareLink = `https://api.whatsapp.com/send?text=Check out this product: ${encodeURIComponent(productUrl)}`;
    res.send(whatsappShareLink);
  });
//

router.get("/about",(req,res)=>{
    res.render("about/about")
})
module.exports=router;