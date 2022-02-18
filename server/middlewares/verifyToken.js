const verifyToken = (req, res, next) => {
  const authorization_header = req.headers['authorization'];
  if (authorization_header) {
    const token = authorization_header;
    req.token = token
    next()
  } else {
    return res.status(400).json({ message: 'Token no ingresado' })
  }
}

module.exports = verifyToken