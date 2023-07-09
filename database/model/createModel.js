const mongoose = require("mongoose");
require('../db')

const create_schema = new mongoose.Schema({
  title: String,
  poster: {
    data: Buffer,
    contentType: String
  },
  blog: String,
  author: String
});

const create_model = mongoose.model('create_collection', create_schema);
module.exports = create_model
