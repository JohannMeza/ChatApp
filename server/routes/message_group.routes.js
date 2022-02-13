const { Router } = require('express');
const router = Router();

// --- Controllers
const messageGroup = require('../constrollers/message_group.controller')

router.get('', messageGroup.index)
router.get('/:id', messageGroup.show)
router.post('/', messageGroup.store)
router.put('', messageGroup.update)
router.delete('', messageGroup.deleted)

module.exports = router