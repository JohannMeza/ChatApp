const Contacts = require('../models/Contacts')

const index = async (req, res) => {
  const contacts = await Contacts.find().populate('idContacts');
  res.json(contacts)
}

const store = async (req, res) => {
  try {
    const { idUser, idContacts } = req.body;  
    const exintingContacts = await Contacts.findOne({ idUser });

    if (exintingContacts) {
      const contactExiting = exintingContacts.idContacts.find(el => el._id.toString() === idContacts )
      if (contactExiting) return res.status(201).json({ message: "Este contacto ya existe" })

      const contacts = await Contacts.updateOne({ idUser }, { $push: { idContacts } }, { new: true })
      res.status(201).json(contacts)
    } else {
      const contacts = new Contacts({ idUser, idContacts })
      await contacts.save()
      res.status(201).json(contacts)
    }
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

const update = async (req, res) => {
  try {
    const id = req.params.id
    const { idContacts } = req.body
    const contact = await Contacts.updateOne({ idUser: id }, { $pull: { idContacts: { $in: [idContacts] }} }, { new: true }) 
    res.status(201).json(contact)
  } catch (err) {
    return res.status(500).json({ message: `Error on server ${err}` })
  }
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