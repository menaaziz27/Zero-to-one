
const mongoose = require('mongoose');
const buildAdminRouter = require('../routes/admin');
const { default: AdminBro } = require('admin-bro')
const express = require('express');
const app = express();
const AdminBroMongoose = require('admin-bro-mongoose');
AdminBro.registerAdapter(AdminBroMongoose);
const options = require('./admin_Options');
const run = async () => {
   await mongoose.connect('mongodb://localhost:27017/zerotoone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  // const options = {
  //   databases: [database],
  // };
  const admin = new AdminBro(options);
  const router = buildAdminRouter(admin);
  app.use(admin.options.rootPath, router);
  app.listen(8080)
}


module.exports = run;
