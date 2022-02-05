const { Router } = require('express');
const router = Router();
const userController = require('../constrollers/user.controller')

router.get('/', userController.index)

module.exports = router