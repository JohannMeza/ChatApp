const { connect } = require('mongoose');
const config = require('./config')

const startConnection = async () => {
  try {
    connect(config.MONGODB_URI);
    console.log("Database is connected")
  } catch (err) {
    console.error(err)
  }
}

module.exports = startConnection;