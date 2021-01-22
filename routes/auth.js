// ============ Node-Packages============ 
const express = require('express');
const { check, body } = require('express-validator');

// ============ My-Modules ============ 
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
} = require('../controllers/authController');

const User = require('../models/User');

const router = express.Router();


//Registeration
router.get('/Register', getRegister);

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
  postRegister,
);

//Login

router.get('/Login', getLogin);

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
  postlogin,
);

//logOut

router.post('/logout', postLogout);

//Reset password

router.get('/reset', getReset);
router.post('/reset', postReset);

router.get('/reset/:token',getNewPassword);

router.post('/new-password',postNewPassword);



module.exports = router;
