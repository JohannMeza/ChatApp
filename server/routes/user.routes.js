const { Router } = require("express");
const router = Router();

// -- Controllers 
const signController = require('../controllers/sign.controller')
const userController = require('../controllers/user.controller')

// --- Midllewares
const middleware = require('../middlewares/index');

router.post('/', userController.index);

router.get('/access',  middleware.verifyToken, signController.toAccess)
router.post('/login', signController.signIn);
router.post('/register', signController.signUp);

router.post('/upload/:id', middleware.upload.single('file'), userController.uploadImage)
router.get('/:id', userController.show);
router.put('/:id', userController.upload);
router.delete('/:id', userController.deleted);

module.exports = router