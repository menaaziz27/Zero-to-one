// ============ Node-Packages ============ 
const express = require('express');
const { check, body } = require('express-validator');

// ============ My-Modules ============ 
const registerController = require('../controllers/Register');
const LoginController = require('../controllers/Login');
const ResetController = require('../controllers/resetPassword');
const User = require('../models/User');

const router = express.Router();



//Registeration
router.get('/Register', registerController.getRegister);

router.post(
  '/Register',
  [
    check('email')
      .isEmail()
      .withMessage('please enter a valid email')
      .custom((value, { req }) => {
        //async validation (we wating for date )
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              'E-mail is already exist, please pick a different one.',
            );
          }
        });
      })
      .normalizeEmail(),

    //password validation
    body(
      'password',
      'please enter a password with only numbers and text and at least 5 characters. ',
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),

    //confirm password validation
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      }),
  ],
  registerController.postRegister,
);

//Login

router.get('/Login', LoginController.getLogin);

router.post(
  '/Login',
  [
    check('email')
      .isEmail()
      .withMessage('please enter a valid email address.')
      .normalizeEmail()
      .custom((value, { req }) => {
        //async validation (we wating for date )
        return User.findOne({ email: value }).then((userDoc) => {
          if (!userDoc) {
            return Promise.reject(
              'E-mail does not exist, please write a corerct one.',
            );
          }
        });
      }),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  LoginController.postlogin,
);

//logOut

router.post('/logout', LoginController.postLogout);

//Reset password

router.get('/reset', ResetController.getReset);
router.post('/reset', ResetController.postReset);

router.get('/reset/:token',ResetController.getNewPassword);

router.post('/new-password',ResetController.postNewPassword);



module.exports = router;
