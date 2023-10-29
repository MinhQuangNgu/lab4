const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cartModel = new schema({
    discountTotal: {
        type: Number
    },
    totalProduct: {
        type: Number
    },
    totalQuantity: {
        type: Number
    },
    totalPrice: {
        type: Number
    },
    products: [
        {
            _id: mongoose.Schema.Types.ObjectId,
            name:String,
            price:Number,
            quantity:Number,
            discountPercentage:Number,
            total:Number,
            thumpnail:String
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("cart", cartModel);