
const Review=require("./review");

const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    img:{
        type:Array,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        min:0,
        default:0
    },
    desc:{
        type:String,
        trim:true
    },
    reviews:
    [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
        }
    ],
});

const Product=mongoose.model("Product",productSchema);
module.exports=Product;