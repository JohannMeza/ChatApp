const { Router } = require('express');
const router = Router();
const groupController = require('../controllers/group.controller');

router.get('/', groupController.index);
router.get('/:id', groupController.show)
router.post('/', groupController.store)
router.put('/:id', groupController.updated)
router.delete('/:id', groupController.deleted)

module.exports = router
