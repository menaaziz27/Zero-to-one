const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const User  = require('../models/User');
const Post  = require('../models/Post');
const Roadmap  = require('../models/Roadmap');
const Topic  = require('../models/Topic');

/** @type {import('admin-bro').AdminBroOptions} */

const options = {
  resources: [User,Post,Roadmap,Topic],
  rootPath:'/admin',
  branding: {
    companyName: 'ZEROTOONE',
  }
};

module.exports = options;