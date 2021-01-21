// ============ Node-Packages ============ 
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);

// ============ Core-Modules ============
const path = require('path');

// ============ My-Modules ============
require('./utils/db');
const User = require('./models/User');

// ============ constant vars ============
const MongoDB_URI = 'mongodb://localhost:27017/zerotoone';

const app = express();

// Routes
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')


// storing sessions in DB
const store = new MongoDBStore({
    uri: MongoDB_URI,
    collection: 'sessions',
});

// set ejs template engines
app.set('view engine', 'ejs');
app.set('views', 'views');

// ==== middlewares which will be executed before every incoming request ====
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
// for attaching session object in every request and connect the cookie id with its
// appropriate user session
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    }),
);

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
// app.use(csrfProtection)
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedin;
    next();
});


// ============ Routes ============
app.use(homeRoutes);
app.use(authRoutes);
app.use(userRoutes);
// app.use(notFoundRoute)

app.listen(3000)