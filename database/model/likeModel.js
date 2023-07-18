const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// List of columns for Employee schema
let like_schema = new Schema({
  like: {
    type: Number,
  },
});

module.exports = mongoose.model("like_collection", like_schema);
