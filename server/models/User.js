const { Schema, model } = require('mongoose');

const userSchema = new Schema ({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    default: 'Welcome a pipedrive'
  },
  image: {
    type: String,
    required: true,
    trim: true,
    default: '../assets/user-default.png'
  },
},{
  versionKey: false,
  timestamps: true
})

const User = model('User', userSchema);

module.exports = User