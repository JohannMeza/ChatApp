const Group_User = require('../models/Group_User')

const index = async (req, res) => {
  const groupUser = await Group_User.find()
  res.json(groupUser)
}

const show = async (req, res) => {
  try {
    const id = req.params.id;
    const groupUser = await Group_User.findOne({ idOwner: id }).populate('idGroups')
    if (!groupUser) return res.status(201).json({ message: "Sin usuarios" })
    res.status(201).json(groupUser)
  } catch (err) {
    return res.status(500).json({ message: `Error on server ${err}` })
  }
}

const store = async (req, res) => {
  try {
    const { idOwner, idGroups } = req.body;
    if (!idOwner || !idGroups) return res.status(401).json({ message: 'Data required incomplete' })

    const groupUser = new Group_User({ idOwner, idGroups })
    await groupUser.save();

    res.status(201).json({ message: 'Group add' })
  } catch (err) {
    return res.status(500).json({ message: `Error on server ${err}` })
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
  show,
  store,
  update,
  deleted
}