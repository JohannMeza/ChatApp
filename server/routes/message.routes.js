const { Router } = require('express');
const router = Router();
const messageController = require('../constrollers/message.controller');
// const middleware = require('../middlewares/index')

router.get('/', messageController.index)
router.get('/:id', messageController.show)
router.post('/user', messageController.userMessages)
router.post('/',  messageController.store)
router.put('/:id', messageController.updated)
router.delete('/:id', messageController.deleted)

module.exports = router