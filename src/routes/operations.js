const router = require('express').Router();
const { operationsController } = require('../controllers');

router.post('/', operationsController.create);
router.get('/', operationsController.list);

module.exports = router;
