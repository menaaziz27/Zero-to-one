const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const Post  = require('./models/Post');

/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [Post],
};

module.exports = options;