const { Router } = require("express");
const router = Router();

// -- Controllers 
const signController = require('../constrollers/sign.controller')
const userController = require('../constrollers/user.controller')

// --- Midllewares
const middleware = require('../middlewares/index');
// upload.single('file')

router.get('/', userController.index);

router.get('/access',  middleware.verifyToken, signController.toAccess)
router.post('/login', signController.signIn);
router.post('/register', signController.signUp);

router.get('/:id', userController.show);
router.put('/:id', userController.upload);
router.delete('/:id', userController.deleted);

module.exports = router