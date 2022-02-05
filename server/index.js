const app = require('./app');
const startConnection = require('./database')

startConnection()

app.listen(app.get('port'), () => {
  console.log("Server on port", app.get('port'));
})