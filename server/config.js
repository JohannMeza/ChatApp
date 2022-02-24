const { config } = require('dotenv');
config()

module.exports = {
  MONGODB_URI: 'mongodb://localhost/ChatApp',
  // MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/ChatApp',
  PORT: process.env.PORT || 3000,
  SECRET: process.env.SECRET
}