const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

//Get login page
exports.getLogin = (req, res, next) => {
  res.render('auth/Login', {
    pageTitle: 'Login',
    errorMassage: null,
  });
};

//Post Login
exports.postlogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/Login', {
      path: '/Login',
      pageTitle: 'Login',
      errorMassage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  }
  try {
    const user = await User.findOne({ email: email });

    const doMatch = await bcrypt.compare(password, user.password); //true or false

    if (doMatch) {
      req.session.isLoggedin = true;
      req.session.user = user;
      return req.session.save((err) => {
        console.log(err);
        res.redirect('/');
      });
    }
    res.status(422).render('auth/Login', {
      path: '/Login',
      pageTitle: 'Login',
      errorMassage: 'Wrong password',
      oldInput: {
        email: email,
        password: password,
      },
      validationErrors: errors.array(),
    });
  } catch (e) {
    console.log(e);
  }
};

//Post logout page
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
