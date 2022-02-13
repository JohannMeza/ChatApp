// --- Models
const MessageGroup = require('../models/Message_Group')

const index = (req, res) => {
  res.send("Show message")
}

/**
 * 
 * Show messages by his group id 
 * @param {id} group
 * @returns Show all Messages of group
 */
const show = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(201).json({ message: 'Id of group not sended' });
    const messageGroup = await MessageGroup.find({ idGroup: id })
    res.status(201).json(messageGroup)
  } catch (err) {
    return res.status(500).json({ message: `Error on server ${err}` })
  }
}

/**
 * Save message
 * @param {idGroup, sentBy, message} req
 * @param {Message} res 
 * @returns 
 */
const store = async (req, res) => {
  try {
    const { idGroup, sentBy, message } = req.body;
    if (!message && !req.file) return res.status(401).json({ message: 'Message not found' })
    if (!idGroup || !sentBy) return res.status(401).json({ message: 'Data required incomplete' })

    const saveMessageGroup = new MessageGroup({ idGroup, sentBy, message })
    await saveMessageGroup.save()

    res.status(200).json({ message: 'User save' })
  } catch (err) {
    return res.status(500).json({ message: `Error on server ${err}` })
  }
}

const update = (req, res) => {
  res.send("Update message")
}

const deleted = (req, res) => {
  res.send("Delete message")
}

module.exports = {
  index, 
  store,
  show, 
  update,
  deleted
}