const router = require('express').Router();
const { operationTypesController } = require('../controllers');

router.get('/', operationTypesController.list);

module.exports = router;
