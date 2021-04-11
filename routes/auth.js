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
  getAdminLogin,
  postAdminlogin

} = require('../controllers/authController');

router.get('/register', getRegister);
router.post('/register', validateRegister, postRegister);
router.get('/login', getLogin);
router.get('/adminlogin', getAdminLogin);
router.post('/login', validateLogin, postlogin);
router.post('/adminlogin', validateLogin, postAdminlogin);
router.post('/logout', postLogout);
router.get('/reset', getReset);
router.post('/reset', postReset);
router.get('/reset/:token', getNewPassword);
router.post('/new-password', postNewPassword);

module.exports = router;
