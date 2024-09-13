const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    amount:{
        type:String,
    },
    productinfo:{
        type:String
    },
    orderedProducts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
},
{timestamps:true});

const Order=mongoose.model('Order',orderSchema);
module.exports=Order;