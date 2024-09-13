
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Order=require("./order")


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true
    },
    role:{
        type:String,
        default:'buyer',
        
    },
    wishList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    cart:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            },
            name:{
                type:String
            },
            img:{
                type:Array
            },
            quantity:{
                type:Number,
                default:1
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
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'

        }
    ],
    cashback:{
        type:Number,
        default:0
    }

});

userSchema.plugin(passportLocalMongoose);


const User = mongoose.model('User', userSchema);

module.exports = User;