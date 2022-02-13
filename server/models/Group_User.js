const { Schema, model } = require('mongoose');

const groupUserSchema = new Schema({
  idOwner: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true
  },
  idGroups: {
    ref: 'Group',
    type: [Schema.Types.ObjectId],
    required: true
  }
},{
  versionKey: false,
  timestamps: true
});


const Group_User = model('Group_User', groupUserSchema);
module.exports = Group_User