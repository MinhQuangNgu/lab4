const userController = require('../controller/userController');

const router = require('express').Router();

router.post('/',userController.register);

module.exports = router;