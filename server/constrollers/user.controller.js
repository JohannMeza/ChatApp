const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config')
const encryptPassword = require('../libs/EncryptPass')

const userLogin = async (req, res) => {
  const user = await User.find();
  res.status(200).json(user)
} 

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imgUrl = req.file.path || 'imagen por default' // --- Save Image
    const user = new User({ 
      name, 
      email, 
      imgUrl,
      password: await encryptPassword(5, password) 
    });

    const userSave = await user.save();
    console.log(userSave)

    const token = jwt.sign({id: userSave}, config.SECRET, {
      expiresIn: 86400 // 24 horas
    })

    res.status(201).json({token});
  } catch (err) {
    return res.status(500).json({message: "Error not Found"})
  }
}

const index = async (req, res) => {
  const users = await User.find();
  res.status(201).json(users)
}

const show = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    if (!user) res.status(404).json({ message: 'User not found' })
    res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Error not found' })
  }
}

const upload = async (req, res) => {
  try {
    let { password } = req.body;
    
    if (password) password = await encryptPassword(5, password)
    req.body.password = password
    
    const userUpload = await User.findOneAndUpdate(req.params.id, req.body, { new: true })
    if (!userUpload) return res.status(404).json({ message: 'User not found for update' })
    res.status(201).json(userUpload)
  } catch (err) {
    return res.status(500).json({ message: 'Error not found' })
  }
}

const deleted = async (req, res) => {
  try {
    const userDelete = await User.findByIdAndDelete(req.params.id);
    if (!userDelete) return res.status(404).json({ message: "User not found for delete" })
    res.status(201).json({ message: "User delete" })
  } catch (err) {
    return res.status(500).json({ message: "Error not found" })
  }
}

module.exports = {
  userLogin,
  userRegister,
  index,
  show,
  upload,
  deleted
}