// ============ Node-Packages============
const router = require('express').Router();

// ============ My-Modules ============
const User = require('../models/User');
const {
	getRegister,
	getLogin,
	getNewPassword,
	getReset,
	postLogout,
	postlogin,
	postNewPassword,
	postReset,
	postRegister,
	validateRegister,
	validateLogin,
} = require('../controllers/authController');

router.get('/Register', getRegister);
router.post('/Register', validateRegister, postRegister);
router.get('/Login', getLogin);
router.post('/Login', validateLogin, postlogin);
router.post('/logout', postLogout);
router.get('/reset', getReset);
router.post('/reset', postReset);
router.get('/reset/:token', getNewPassword);
router.post('/new-password', postNewPassword);

module.exports = router;
