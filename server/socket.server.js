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
      console.log("Usuario nuevo", users)
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

    socket.on('client:active', data => {
      // console.log(data, users)
      const contactsActives = data.contacts.filter(contact => users.find(user => user.userID === contact) )
      if (contactsActives.length !== 0) {
        const arrID = []
        contactsActives.forEach(id => {
          arrID.push(id.socketID)
        })

        console.log("ID", arrID)
        console.log("Contactos activos", contactsActives)
        io.to(contactsActives).emit('server:active', data.id)
      }
    })

    socket.on('disconnect', close => {
      users.splice(users.findIndex(el => el.socketID === socket.id), 1)
      console.log("se desconecto un usuario", socket.id, close)
    })

  })
}