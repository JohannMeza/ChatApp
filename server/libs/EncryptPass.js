const bcrypt = require('bcrypt');

async function EncryptPassword (numSalt, password) {
  if (!password) return
  const salt = await bcrypt.genSalt(numSalt)
  return bcrypt.hashSync(password, salt)
}

module.exports = EncryptPassword;