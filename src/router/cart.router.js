const cartController = require('../controller/cartController');

const router = require('express').Router();

router.post('/',cartController.createNewCart);
router.get('/',cartController.getCart);

module.exports = router;