const Image = require('../model/image.model');
const Product = require('../model/product.model');
class productController {
    async createNewProduct(req, res) {
        try {
            const { name, description, price, discountPercentage, stock, brand, images,thumpnail } = req.body;
            const product = new Product({
                name,
                description,
                price, discountPercentage, stock, brand, images,
                thumpnail:process.env.URL + "/uploads/" + thumpnail,
                comments: []
            });
            await product.save();
            return res.status(200).json({
                msg: "Tạo product thành công!"
            })
        }
        catch (err) {
            return res.status(500).json({
                msg: err
            })
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            return res.status(200).json(products);
        }
        catch (err) {
            return res.status(500).json({
                msg: err
            })
        }
    }
}
module.exports = new productController();