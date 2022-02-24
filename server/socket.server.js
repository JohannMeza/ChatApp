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
      users.forEach(el => {
        if (el.userID === messageData.receivedBy) {
          console.log('Usuario encontrado')
          return io.to(el.socketID).emit('server:messagereturn', messageData)
        }
      })
    })

    socket.on('client:view', data => {
      users.forEach(el => {
        if (el.userID === data.receivedBy) {
          console.log('Usuario encontrado visto')
          return io.to(el.socketID).emit('server:view', true)
        }
      })
    })

    socket.on('disconnect', close => {
      users.splice(users.findIndex(el => el.socketID === socket.id), 1)
      console.log("se desconecto un usuario", socket.id, close)
    })

  })
}