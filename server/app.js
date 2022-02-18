const cors = require('cors')
const path = require('path');
const morgan = require('morgan')
const config = require('./config')

const express = require('express');
const app = express();

const http = require('http')
const socketio = require('socket.io')
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
})
require('./socket.server')(io)

// --- Rutas
const userRoutes = require('./routes/user.routes')
const messageRoutes = require('./routes/message.routes')
const groupRoutes = require('./routes/group.routes')
const messageGroupRoutes = require('./routes/message_group.routes')
const contactsRoutes = require('./routes/contacts.routes')
const GroupUsersRoutes = require('./routes/group_user.routes')
const RequestRoutes = require('./routes/request.routes')

// --- Settings
app.set('port', process.env.PORT || config.PORT || 3000);

// --- Files Public
app.use(express.static(path.join(__dirname, '..', '/', 'public')))

// --- Middlewares 
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

// --- Routes 
app.use('/api/user', userRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/group', groupRoutes)
app.use('/api/messageGroup', messageGroupRoutes)
app.use('/api/contacts', contactsRoutes)
app.use('/api/groupUser', GroupUsersRoutes)
app.use('/api/request', RequestRoutes)

module.exports = { 
  app,
  server,
  config
 };