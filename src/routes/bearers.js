const router = require('express').Router();
const { bearersController } = require('../controllers');

router.post('/', bearersController.create);

module.exports = router;
