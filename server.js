require('dotenv').config()
const http = require('http')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const server = http.createServer(app)

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(morgan(process.env.DEBUG ? 'dev' : 'combined'))
app.use(express.static('public'))

server.listen(process.env.PORT)

