const Group = require('../models/Group');

const index = async (req, res) => {
  const group = await Group.find();
  res.status(201).json(group)
}

const show = async (req, res) => {
  try {
    const groupShow = await Group.findOne({ _id: req.params.id }).populate(['admin', 'users'])
    if (!groupShow) return res.status(404).json({ message: "Group not found for search by id" })
    res.status(201).json(groupShow)
  } catch (err) {
    return res.status(500).json({ message: "Error not found" + err })
  } 
}

const store = async (req, res) => {
  try {
    const { admin, users, name, description } = req.body;
    const imgUrl = req.file ? req.file.path : false || 'Imagen por default';
    const userClass = new Group({ admin, users, name, description, imgUrl });
    const userSave = await userClass.save();
    res.status(201).json(userSave);
  } catch (err) {
    return res.status(500).json({ message: 'Error not found' + err })
  }
}
 
const updated = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name && !description) return res.status(401).json({ message: "There is nothing to update" })
    const imgUrl = req.file ? req.file.path : false || 'Imagen por default'
    
    const groupUpdate = await Group.findByIdAndUpdate(req.params.id, { name, description, imgUrl }, { new: true })
    if (!groupUpdate) return res.status(404).json({ message: "Group not found for update" })
    res.status(201).json(groupUpdate)
  } catch (err) {
    return res.status(500).json({ message: 'Error not found' + err })
  }
}

const deleted = async (req, res) => {
  try {
    const groupDelete = await Group.findByIdAndDelete(req.params.id);
    if (!groupDelete) return res.status(404).json({ message: "Group not found" });
    res.status(201).json({ message: "Group delete" })
  } catch (err) {
    return res.status(500).json({ message: "Error not found" + err })
  }
}

module.exports = { 
  index,
  show,
  store,
  updated,
  deleted
 }