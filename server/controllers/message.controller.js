const User = require('../models/User');
const Message = require('../models/Message');

const index = async (req, res) => {
  const messages = await Message.find();
  res.status(201).json(messages);
}

const userMessages = async (req, res) => {
  try {
    const { sentBy, receivedBy } = req.body;
    const messages = await Message.find({ 
      $or: [
        { 
          $and: [ 
            { sentBy: sentBy }, 
            { receivedBy: receivedBy } 
          ]
        },
        {
          $and: [ 
            { sentBy: receivedBy }, 
            { receivedBy: sentBy } 
          ]
        },
      ]
    });

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
    const { sentBy, receivedBy, message } = req.body;
    if (!message || !sentBy || !receivedBy) return res.status(404).json({ message: "Data incomplete" })

    let file = null;
    if (req.file) {
      file = req.file.path
    }

    const userValidate = await User.findOne({_id: sentBy}, { _id: 1 })
    if (!userValidate) return res.status(404).json({ message: "Error the user sending the message is not found in the database" })

    const mess = new Message({ message, sentBy, receivedBy, file })
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