const { Schema, model } = require('mongoose');

const requestSchema = new Schema({
  idUser: {
    ref: 'User',
    type: Schema.Types.ObjectId
  },
  idRequest: {
    ref: 'User',
    type: [Schema.Types.ObjectId] 
  }
},{
  versionKey: false,
  timestamps: true
})

const Request = model('Request', requestSchema);

module.exports = Request