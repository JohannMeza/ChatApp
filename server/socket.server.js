// const User = require('./models/User')

module.exports = (io) => {
  const users = []

  io.on('connection', (socket) => {
    socket.on('client:newconnection', data => {
      const userData = {
        socketID: socket.id,
        userID: data
      }
  
      users.push(userData)
    })
    
    socket.on('client:messagesend', messageData => {
      const confirmateUser = []
      users.forEach(el => {
        if (el.userID === messageData.receivedBy) confirmateUser.push(el.socketID)
      })
      confirmateUser.push(socket.id)
      // io.emit('server:messagereturn', messageData)
      io.to(confirmateUser).emit('server:messagereturn', messageData)
    })

    socket.on('disconnect', close => {
      users.splice(users.findIndex(el => el.socketID === socket.id), 1)
      console.log("se desconecto un usuario", socket.id, close)
    })
  })
}