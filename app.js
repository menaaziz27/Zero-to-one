// ============ Node-Packages ============
const express = require('express');
const bodyparser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const MongoDBStore = require('connect-mongodb-session')(session);
require('ejs');
const mongoose = require('mongoose');

//==================admin bro ===================
const buildAdminRouter = require('./routes/admin');
const { default: AdminBro } = require('admin-bro')
const AdminBroMongoose = require('admin-bro-mongoose');
AdminBro.registerAdapter(AdminBroMongoose);

// ============ Core-Modules ============
const path = require('path');

// ============ My-Modules ============
// require('./utils/db');
// const run = require('./utils/db');
const { findUser } = require('./middleware/helper');
// Routes
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const roadmap = require('./routes/roadmap');


// ============ constant vars ============
// const MongoDB_URI = 'mongodb+srv://abdallah:abd12345@cluster0.itsjp.mongodb.net/ZeroToOne?&w=majority';
const MongoDB_URI = 'mongodb://localhost:27017/zerotoone';

const app = express();

// storing sessions in DB
const store = new MongoDBStore({
  uri: MongoDB_URI,
	collection: 'sessions',
});

app.set('view engine', 'ejs');

//set upload image settings
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

// ==== middlewares which will be executed before every incoming request ====
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
  );
  app.use('/images', express.static(path.join(__dirname, 'images')));
  
  // for attaching session object in every request and connect the cookie id with its
  // appropriate user session
  app.use(
    session({
      secret: 'my secret',
      resave: false,
		saveUninitialized: false,
		store: store,
	})
);

// settings currentUser and userId in the locals
app.use(findUser);

// const csrfProtection = csrf();
// app.use(csrfProtection)
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedin;
	next();
});

// ============ Routes ============

app.use(homeRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('roadmap',roadmap);

// app.use('/admin', adminRoutes)
// app.use((req, res) => {
// 	res.render('404.ejs');
// });
// app.use((error, req, res, next) => {
  // 	res.redirect("/500");
  // });
  const run = async () => {
    const Post = require('./models/Post')
    const database= await mongoose.connect('mongodb://localhost:27017/zerotoone', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const options = {
      databases: [database],
      resources: [
        {resource : Post ,options:{listProperties:['user','description']}}
      ]
      
    };
    const admin = new AdminBro(options);
    const router = buildAdminRouter(admin);
    app.use(admin.options.rootPath, router);
    app.listen(3000)
  }
  run();