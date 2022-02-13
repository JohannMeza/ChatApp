const { Router } = require('express');
const router = Router();

// --- Controllers
const groupUserController = require('../constrollers/group_user.controller')

router.get('/', groupUserController.index)
router.get('/:id', groupUserController.show)
router.post('/', groupUserController.store)
router.put('/', groupUserController.update)
router.delete('/', groupUserController.deleted)

module.exports = router