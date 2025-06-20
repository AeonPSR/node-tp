const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  tags: [String],
  author: String
});

module.exports = mongoose.model('Article', articleSchema);
