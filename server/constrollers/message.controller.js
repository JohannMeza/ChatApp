const User = require('../models/User');
const Message = require('../models/Message');

const index = async (req, res) => {
  const messages = await Message.find();
  res.status(201).json(messages);
}

const userMessages = async (req, res) => {
  try {
    const { from, to } = req.body;
    console.log(from, to)
    const messages = await Message.find({ $and: [{to: to}, {from: from}] });
    return res.status(201).json(messages) 
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

const show = async (req, res) => {
  try {
    const message = await Message.findOne({_id: req.params.id})
    if (!message) return res.status(404).json({ message: 'Message not found' })
    res.status(201).json(message)
  } catch (err) {
    return res.status(500).json({ message: 'Error not found' });
  }
}

const store = async (req, res) => {
  try {
    const { message, from, to } = req.body;
    if (!message || !from || !to) return res.status(404).json({ message: "Data incomplete" })

    let imgUrl = null;
    if (req.file) {
      imgUrl = req.file.path
    }

    const userValidate = await User.find({ $or: [{_id: to}, {_id: from}] }, { _id: 1 })
    if (!userValidate) return res.status(404).json({ message: "Error the user sending the message is not found in the database" })

    const mess = new Message({ message, from, to, imgUrl })
    await mess.save();

    res.status(201).json({ message: "Message send" })
  } catch (err) {
    return res.status(500).json({ message: 'Error not found' })
  }
}

const updated = async (req, res) => {
  try {
    const message = await Message.findByIdAndUpdate(req.params.id, { viewed: 1 }, { new: true })
    if (!message) return res.status(404).json({ message: "Message not found" });
    res.status(201).json(message)
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

const deleted = async (req, res) => {
  try {
    const message = await Message.findOneAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: "User not found" })
    res.status(201).json({ message: 'Message deleted' })
  } catch (err) {
    return res.status(500).json({ message: "Error not found" })
  }
}

module.exports = { 
  index,
  userMessages,
  show,
  store,
  updated,
  deleted
}