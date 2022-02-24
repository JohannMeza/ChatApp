const { Router } = require('express');
const router = Router();

// --- Controllers
const contactsController = require('../controllers/contacts.controller')

router.get('/', contactsController.index)
router.post('/', contactsController.store)
router.get('/:id', contactsController.show)
router.get('/only-contacts/:id', contactsController.showOnlyContacts)
router.put('/:id', contactsController.update)
router.delete('/:id', contactsController.deleted)

module.exports = router