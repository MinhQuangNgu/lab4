const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productModel = new schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    },
    discountPercentage:{
        type:Number
    },
    stock:{
        type:Number
    },
    brand:{
        type:String
    },
    thumpnail:{
        type:String
    },
    images:[
        {
            _id:mongoose.Schema.Types.ObjectId,
            url:String,
            caption:String
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        },
    ]
},{
    timestamps:true
});

module.exports = mongoose.model("product",productModel);