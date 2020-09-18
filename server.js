require('dotenv').config()
const cors = require('cors')
const http = require('http')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const io = require('./app/config/io')
const ApiRouter = require('./app/router')
const bodyParser = require('body-parser')

const app = express()
const server = http.createServer(app)

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan(process.env.DEBUG ? 'dev' : 'combined'))
app.use(express.static('public'))
app.use('/uploads', express.static(__dirname + '/app/uploads'))

app.use('/api', ApiRouter)

io(server)

server.listen(process.env.PORT)

