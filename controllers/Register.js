const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { reset } = require('nodemon');

const { validationResult } = require('express-validator/check');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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',
    },
  }),
);
//Registeration

//get register page
exports.getRegister = (req, res, next) => {
  res.render('auth/Register', {
    pageTitle: 'Registeration',
    errorMassage: null,
  });
};

//post Register
exports.postRegister = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/Register', {
      path: '/Register',
      pageTitle: 'Register',
      errorMassage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password,
        confirmPassword: req.body.confirmPassword,
      },
      validationErrors: errors.array(),
    });
  }

  try {
    let user = await User.findOne({ email: email });
    if (user) {
      res.redirect('/Register');
    }

    const hashedpass = await bcrypt.hash(password, 12);
    user = new User({
      email: email,
      password: hashedpass,
    });

    user.save();

    res.redirect('/Login');
    transporter.sendMail({
      to: email,
      from: 'abdallahhassann1998@gmail.com',
      subject: 'Signup succeeded !',
      html: '<h1> You successfully signed up<h1>',
    });
  } catch (e) {
    console.log(e);
  }
};
