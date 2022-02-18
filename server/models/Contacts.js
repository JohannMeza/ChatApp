const { Schema, model } = require('mongoose');

const contactsSchema = new Schema({
  idUser: {
    ref: 'User',
    type: Schema.Types.ObjectId,
    required: true,
  },
  idContacts: {
    ref: 'User',
    type: [Schema.Types.ObjectId]
  }
},{
  versionKey: false,
  timestamps: true
})

const Contacts = model('Contacts', contactsSchema);

module.exports = Contacts