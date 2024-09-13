
const passport = require('passport');
const Product = require("./models/product");


const isLoggedIn = (req,res,next)=>{
    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).json({msg:'you need to login first'});
    }
    
    if(!req.isAuthenticated()){
        req.flash('error' , 'you need to login first');
        return res.redirect('/login');
    }
    next();
} 




const isSeller = (req,res,next)=>{
    if(!req.user.role){
        req.flash('error' , 'you donot have the permission to do that');
        return res.redirect('/products');
    }
    else if(req.user.role !== 'seller'){
        req.flash('error' , 'you donot have the permission to do that');
        return res.redirect('/products');
    }
    next();
}



module.exports = { isLoggedIn , isSeller } ;