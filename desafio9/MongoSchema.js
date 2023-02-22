const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  id: String,
  name: String,
  lastname: String,
  age: String,
  nickname: String,
  url: String
});

const messageSchema = new mongoose.Schema({
  id: String,
  text: String,
  fecha: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
});

const Author = mongoose.model('Author', authorSchema);
const Message = mongoose.model('Message', messageSchema);

module.exports = { Author, Message };