const { server, config } = require('./app');
const startConnection = require('./database')

startConnection()

server.listen(config.PORT, () => {
  console.log("Server on port", config.PORT);
})