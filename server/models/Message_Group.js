const { Schema, model } = require('mongoose');

const groupMessageSchema = new Schema({
  idGroup: {
    ref: 'Group',
    type: Schema.Types.ObjectId,
    required: true
  },
  sentBy: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true
  },
  viewed: {
    type: Array,
  },
  message: {
    type: String,
  },
  file: {
    type: String
  }
},{
  versionKey: false,
  timestamps: true
})

const GroupMessage = model('groupMessage', groupMessageSchema);
module.exports = GroupMessage;