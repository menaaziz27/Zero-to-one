//================ admin bro ====================
const mongoose = require('mongoose');
const buildAdminRouter = require('../routes/admin');
const express = require('express');
const app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose
    .connect('mongodb://localhost:27017/zerotoonee')
    .then(client => {
        console.log('connected to db');
    })
    .catch(e => console.log('error connecting to db' + e));