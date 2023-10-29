const Cart = require("../model/cart.model");
const Product = require("../model/product.model");

class cartController {
    async createNewCart(req, res) {
        try {
            const { product_id, quantity, user_id } = req.body;
            const product = await Product.findById(product_id);
            const total = (product?.price * 1 * quantity) * (product?.discountPercentage * 1);
            const oldCart = await Cart.findOne({ user: user_id });
            if (!oldCart) {
                let totalProduct = 1;
                let totalPrice = product?.price;
                let totalQuantity = quantity;
                let discountTotal = (product?.price * 1 * quantity) * (product?.discountPercentage * 1 * 0.01);
                const newCart = new Cart({
                    totalProduct,
                    totalPrice,
                    totalQuantity,
                    discountTotal,
                    products: [
                        {
                            _id: product?._id,
                            name: product?.name,
                            price: product?.price,
                            quantity: quantity,
                            discountPercentage: product?.discountPercentage,
                            total: total,
                            thumpnail:product?.thumpnail
                        }
                    ],
                    user: user_id
                })
                await newCart.save();
            }
            else {
                const remainProduct = oldCart.products?.some(item => {
                    return item?._id.equals(product?._id)
                });
                if (remainProduct) {
                    let products = [];
                    oldCart.products?.forEach(item => {
                        console.log(item);
                        if (item?._id.equals(product?._id)) {
                            products.push({
                                ...item._doc,
                                quantity: item.quantity + quantity
                            });
                        }
                        else {
                            products.push(item._doc);
                        }
                    })
                    await Cart.findOneAndUpdate({ user: user_id }, {
                        products
                    })
                }
                else {
                    await Cart.findOneAndUpdate({ user: user_id }, {
                        $addToSet: {
                            products: {
                                _id: product?._id,
                                name: product?.name,
                                price: product?.price,
                                quantity: quantity,
                                discountPercentage: product?.discountPercentage,
                                total: total,
                                thumpnail:product?.thumpnail
                            }
                        }
                    });
                }
                let cart = await Cart.findOne({ user: user_id });
                let totalProduct = 0;
                let totalPrice = 0;
                let totalQuantity = 0;
                let discountTotal = 0;
                cart.products?.forEach(item => {
                    totalProduct += 1;
                    totalQuantity += item?._doc?.quantity;
                    totalPrice += item?._doc?.price * item?._doc?.quantity;
                    discountTotal += (item?._doc?.price * 1 * item?._doc?.quantity) * (item?._doc?.discountPercentage * 0.01)
                });
                await Cart.findByIdAndUpdate(cart._id, {
                    totalProduct,
                    totalPrice,
                    totalQuantity,
                    discountTotal
                })

            }
            return res.status(200).json({
                msg: "Update successfully!"
            })

        }
        catch (err) {
            console.log(err);
            return res.status(500).json({
                msg: err
            })
        }
    }

    async getCart(req, res) {
        try {
            const { user_id } = req.query;
            const carts = await Cart.findOne({ user: user_id });
            return res.status(200).json(carts);
        }
        catch (err) {
            return res.status(500).json({
                msg: err
            })
        }
    }
}

module.exports = new cartController();