const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Product = require('../models/product');
const User = require('../models/User');
const Order=require("../models/order")

router.get('/user/cart' , isLoggedIn , async(req,res)=>{
    const user = await User.findById(req.user._id).populate('cart.productId');
    const totalAmount = user.cart.reduce((sum , curr)=> sum+curr.price*curr.quantity , 0)

    const productInfo = user.cart.map((p)=>p.desc).join(',');
    res.render('cart/cart' , {user, totalAmount , productInfo });
})


router.post('/user/:productId/add' , isLoggedIn , async(req,res)=>{
    let {productId} = req.params;
    let userId = req.user._id;
    let product = await Product.findById(productId);
    let user = await User.findById(userId);
    let find=0;
    for(let prod of user.cart){
        if(prod._id==productId){
            prod.quantity++;
            find++;
        }
    }
    if(find==0){
        user.cart.push(product);
    }
   
    await user.save();
    res.redirect('/user/cart'); 
})


//success
router.post("/payment/success",async(req,res)=>{
    const{amount,productinfo}=req.body;
    const cashBackEarn=amount*0.03;
    const user=req.user;
    const order=new Order({amount,productinfo,orderedProducts:[...user.cart]});
    req.user.cashback=req.user.cashback+cashBackEarn;
    console.log(user);
    user.orders.push(order);
    await order.save();
    user.cart.splice(0,req.user.cart.length);

    req.user=await user.save();
    res.render("cashBack/cashBack",{cashBackEarn});
});

router.get("/myOrder",async(req,res)=>{
    const user = await User.findById(req.user._id).populate('orders');

    res.render("myorder",{user});
})

router.get("/wallet",(req,res)=>{
    const user=req.user;
    const cashBack=user.cashback;
    res.render("wallet/wallet",{cashBack})
})
module.exports = router;