const mongoose = require("mongoose");
require('../db')

const admin_create_schema = new mongoose.Schema({
  title: String,
  poster: {
    data: Buffer,
    contentType: String
  },
  blog: String,
  author: String,
  bid: String
});

const admin_create_model = mongoose.model('admin_create_collection', admin_create_schema);
module.exports = admin_create_model
