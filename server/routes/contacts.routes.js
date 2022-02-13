const { Router } = require('express');
const router = Router();

// --- Controllers
const contactsController = require('../constrollers/contacts.controller')

router.get('/', contactsController.index)
router.post('/', contactsController.store)
router.get('/:id', contactsController.show)
router.put('/:id', contactsController.update)
router.delete('/:id', contactsController.deleted)

module.exports = router