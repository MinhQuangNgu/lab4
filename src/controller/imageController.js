const Image = require('../model/image.model');
class imageController {
    async uploadSingleImage(req, res) {

    }
    async uploadMultipleImage(req, res) {
        const files = req.files;
        try {
            const filenames = files.map(file => file.filename);
            res.status(200).json(filenames);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async uploadMultipleImages(req, res) {
        try {
            const {tempImageStore} = req.body;
            let tempImage = [];
            tempImageStore.forEach(async (item) => {
                const image = new Image({
                    url:process.env.URL + "/uploads/" + item?.url,
                    caption:item?.caption,
                    path:item?.url
                })
                tempImage.push({
                    _id:image?._id,
                    url:image?.url,
                    caption:image?.caption
                });
                await image.save();
            })
            return res.status(200).json({
                tempImage
            });
        }
        catch (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new imageController();