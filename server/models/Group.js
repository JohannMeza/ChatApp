const { Schema, model } = require('mongoose');

const groupSchema = new Schema ({
  admin: {
    ref: 'User',
    type: [Schema.Types.ObjectId],
    required: true
  },
  users: {
    ref: 'User',
    type: [Schema.Types.ObjectId],
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true,
    default: 'Link por default'
  }
},{
  versionKey: false,
  timestamps: true
})

const Group = model('Group', groupSchema);

module.exports = Group