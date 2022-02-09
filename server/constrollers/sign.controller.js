const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config')

const toAccess = (req, res) => {
  console.log(req.token)  
  jwt.verify(req.token, config.SECRET, (err, userData) => {
    if (err) {
      res.status(500).json({ message: "Invalid Token" })
    } else {
      res.status(201).json(userData)
    }
  })
}

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("datos", req.body)

    const userEmail = await User.findOne({ email }, { email: 1, password: 1, name: 1 })
    if (!userEmail) return res.json({ message: "Email incorrect" })
    
    const passwordDecript = bcrypt.compareSync(password, userEmail.password)
    if (!passwordDecript) return res.json({ message: "Password incorrect" })

    // Generate Token
    const token = jwt.sign({ user: userEmail }, config.SECRET, {
      expiresIn: 86400 * 7 // 24 horas * 7 dias
    })

    res.status(201).json({ token })
  } catch (err) {
    return res.status(500).json({ message: 'Error not found', error: err })
  }
}

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imgUrl = 'Imagen por default';
    // if (!name || !email || !password) return res.status(401).json({ message: "Data incompleted" })
    const salt = await bcrypt.genSalt(10);
    
    const userDuplicate = await User.findOne({ email: email })
    if (userDuplicate) return res.json({ message: 'Usuario ya registrado' })

    const user = new User({
      name,
      email,
      imgUrl,
      password: await bcrypt.hash(password, salt)
    })

    const userSave = await user.save();
    res.status(201).json(userSave)
  } catch (err) {
    return res.status(500).json({ message: 'Error not found' + err })
  }
}

module.exports = {
  toAccess,
  signIn,
  signUp
}