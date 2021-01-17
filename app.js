//defining packages

const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const app = express();
const session = require('express-session');
const csrf = require('csurf');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);

//storing sessions in database
const MongoDB_URI =
  'mongodb+srv://abdallah:abd12345@cluster0.itsjp.mongodb.net/ZeroToOne?&w=majority';

const store = new MongoDBStore({
  uri: MongoDB_URI,
  collection: 'sessions',
});

//Routes
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');

//set sessions config
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);

//models
const User = require('./models/user');

app.use(bodyparser.urlencoded({ extended: false }));

// set ejs template engines
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

// const csrfProtection = csrf();
app.use(flash());

// app.use(csrfProtection)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedin;
  next();
});

app.use(homeRoutes);
app.use(authRoutes);

//app.use(404)

mongoose
  .connect(MongoDB_URI)
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
