const Contacts = require('../models/Contacts')

const index = async (req, res) => {
  const contacts = await Contacts.find();
  res.json(contacts)
}

const store = async (req, res) => {
  try {
    const { idUser, idContacts } = req.body;  
    const contacts = new Contacts({ idUser, idContacts })
    await contacts.save()
    res.status(201).json({ message: 'Contact save' })
  } catch (err) {
    return res.status(500).json({ message: `Error on server ${err}` })
  }
}

const show = async (req, res) => {
  try {
    const id = req.params.id
    const contactsAll = await Contacts.findOne({ idUser: id }).populate('idContacts')
    if(!contactsAll) return res.status(201).json({ message: 'Sin contactos' })
    res.status(201).json(contactsAll)
  } catch (err) {
    res.status(500).json({ message: `Error on server ${err}` })
  }
}

const update = (req, res) => {
  res.send('update')
}

const deleted = (req, res) => {
  res.send('delete')
}

module.exports = {
  index,
  store,
  show,
  update,
  deleted
}