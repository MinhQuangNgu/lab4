const imageController = require('../controller/imageController');

const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}.${file.originalname.split('.').pop()}`;
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });

router.post('/multiple',upload.array('image'),imageController.uploadMultipleImage);
router.post('/multipleimage',imageController.uploadMultipleImages);

module.exports = router;