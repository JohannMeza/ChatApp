const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path');
const morgan = require('morgan')
const config = require('./config')

const userRoutes = require('./routes/user.routes')
const messageRoutes = require('./routes/message.routes')
const groupRoutes = require('./routes/group.routes')

// --- Settings
app.set('port', config.PORT);

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

module.exports = app;