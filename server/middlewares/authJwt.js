const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" })

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;

    const user = await User.findById(req.userId._id, { password: 0 });
    if (!user) res.status(404).json({ message: 'No user found' });
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = { verifyToken }