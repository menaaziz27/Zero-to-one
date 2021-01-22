const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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',
    },
  }),
);

// =========== Registeration ============

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
    //! this code is not gonna be reached
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
        if(err) {
          console.log(err);
        }
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



//get Reset
exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password',
    errorMassage: message,
  });
};


//Post Reset
exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          req.flash('error', 'No account with that email found.');
          res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'abdallahhassann1998@gmail.com',
          subject: 'Password reset',
          html: `
          <p> you requested password reset </p>
          <p> Click this <a href ="http://localhost:3000/auth/reset/${token}" >link </a> to set a new password </p>
           `,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      let message = req.flash('error');
      if (message.length > 0) {
        message = message[0];
      } else {
        message = null;
      }
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        errorMessage: message,
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;
  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    })
    .then((hashedpassword) => {
      resetUser.password = hashedpassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.redirect('/auth/login');
      return transporter.sendMail({
        to: resetUser.email,
        from: 'abdallahhassann1998@gmail.com',
        subject: 'Reset Password succeeded !',
        html: '<h1> You successfully reset your password<h1>',
      });
    })
    .catch((err) => {
      console.log(err);
    });
};