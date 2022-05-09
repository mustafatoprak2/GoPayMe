const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  categories: [String],
  userId: String,
  image: {
    type: String,
    default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
