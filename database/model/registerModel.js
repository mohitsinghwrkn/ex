const mongoose = require("mongoose");
require('../db')

const register_schema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
});

const register_model = mongoose.model('registerCollection', register_schema);
module.exports = register_model
