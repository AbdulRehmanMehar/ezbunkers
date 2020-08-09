require('dotenv').config()
const http = require('http')
const morgan = require('morgan')
const express = require('express')
const mongoose = require('mongoose')
const ApiRouter = require('./app/router')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const app = express()
const server = http.createServer(app)

mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : `${__dirname}/app/uploads/temp`
}))
app.use(morgan(process.env.DEBUG ? 'dev' : 'combined'))
app.use(express.static('public'))

app.use('/api', ApiRouter)

server.listen(process.env.PORT)

