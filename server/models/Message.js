const { Schema, model } = require('mongoose');

const messageSchema = new Schema ({
  sentBy: {
    type: String,
    required: true,
    trim: true
  },
  receivedBy: {
    type: String,
    required: true,
    trim: true
  },
  viewed: {
    type: Boolean,
    default: 0
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  file: {
    type: String,
    trim: true
  },
},{
  versionKey: false,
  timestamps: true
})

const Message = model('Message', messageSchema);

module.exports = Message;