const { Schema, model } = require('mongoose');

const messageSchema = new Schema ({
  from: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  to: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  message: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    trim: true
  },
  viewed: {
    type: Number,
    required: true,
    default: 0 
  }
},{
  versionKey: false,
  timestamps: true
})

const Message = model('Message', messageSchema);

module.exports = Message;