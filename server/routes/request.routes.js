const { Router } = require('express');
const router = Router();

// --- Controllers
const requestController = require('../controllers/request.controller')

router.get('/', requestController.index)
router.get('/:id', requestController.show)
router.post('/', requestController.store)
router.put('/:id', requestController.update)
router.delete('/:id', requestController.deleted)

module.exports = router