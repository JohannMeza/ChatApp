const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config')

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userEmail = await User.findOne({ email }, { email: 1, password: 1 })
    if (!userEmail) return res.status(401).json({ message: "Email incorrect" })
    
    const passwordDecript = bcrypt.compareSync(password, userEmail.password)
    if (!passwordDecript) return res.status(401).json({ message: "Password incorrect" })

    res.json(userEmail)
  } catch (err) {
    return res.status(500).send({ message: 'Error not found' })
  }
}

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const imgUrl = 'Imagen por default';
    // if (!name || !email || !password) return res.status(401).json({ message: "Data incompleted" })
    const salt = await bcrypt.genSalt(10);
    
    const user = new User({
      name,
      email,
      imgUrl,
      password: await bcrypt.hash(password, salt)
    })

    const userSave = await user.save();
    console.log(user)

    const token = jwt.sign({id: userSave}, config.SECRET, {
      expiresIn: 86400 // 24 horas
    })

    res.status(201).json({ token })
  } catch (err) {
    return res.status(500).json({ message: 'Error not found' + err })
  }
}

module.exports = {
  signIn,
  signUp
}