// ============ Node-Packages ============
// const morgan = require('morgan');
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const MongoDBStore = require('connect-mongodb-session')(session);
require('ejs');
// ============ Core-Modules ============
const path = require('path');

// ============ My-Modules ============
require('./utils/db');
const { findUser } = require('./middleware/helper');

// Routes
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const adminRoutes = require('./routes/admin');
const roadmapsRoutes = require('./routes/roadmap');

// ============ constant vars ============
// const MongoDB_URI = 'mongodb+srv://abdallah:abd12345@cluster0.itsjp.mongodb.net/ZeroToOne?&w=majority';
const MongoDB_URI = 'mongodb://localhost:27017/zerotoone';

const app = express();

const store = new MongoDBStore({
    uri: MongoDB_URI,
    collection: 'sessions',
});

app.set('view engine', 'ejs');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

// app.use(morgan('tiny'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.use(findUser);
app.use(flash());
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedin;
    next();
});

// ============ Routes ============
app.use(homeRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/admin', adminRoutes);
app.use('/roadmaps', roadmapsRoutes);
// app.use('/admin', adminRoutes)
app.use((req, res) => {
    if (!res.locals.error) {
        res.locals.error = 'This page is not found.';
    }
    res.render('404.ejs');
});
// app.use((error, req, res, next) => {
// 	res.redirect("/500");
// });

app.listen(3000);