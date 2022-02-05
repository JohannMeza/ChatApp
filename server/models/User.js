const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  },
  imgUrl: {
    type: String,
    required: true,
    trim: true
  }
},{
  versionKey: false,
  timestamps: true
})

const User = model('User', userSchema);

module.exports = User