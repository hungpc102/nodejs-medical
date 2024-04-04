require('dotenv').config()
const compression = require('compression')
const express = require('express')
const { default: helmet } = require('helmet')
const morgan = require('morgan')
const app = express()
const cors = require('cors');
const WaitingRoom = require('./services/waitingRoom.service')

app.use(cors({
    origin: 'http://localhost:3000' // chỉ cụ thể cho origin nào được phép
  }));

// init middlewares
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// init db
// require('./dbs/init.mongodb')
require('./dbs/init.redis')
require('./dbs/init.mysql')
require('./dbs/init.firebase')
require('./services/coordinator.service')
// const {checkOverload} = require('./helpers/check.connect')
// checkOverload()

//  WaitingRoom.createWaitingRooms();

// init routes
app.use('/', require('./routes'))


// handling error
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status= 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status:'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error'
    })
})


module.exports = app