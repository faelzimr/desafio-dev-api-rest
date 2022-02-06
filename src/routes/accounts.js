const router = require('express').Router();
const { accountsController } = require('../controllers');

router.get('/:cpf', accountsController.get);
router.patch('/:cpf/active', accountsController.updateActive);
router.patch('/:cpf/blocked', accountsController.updateBlocked);
router.post('/', accountsController.create);

module.exports = router;
