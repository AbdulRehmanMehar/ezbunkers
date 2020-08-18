const jwt = require('jsonwebtoken')
const socketIO = require('socket.io')
const ChatModel = require('../models/chat')


module.export = (server) => {
    let users = []
    let messages = []

    const io = socketIO(server)

    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            const token = socket.handshake.query.token
            jwt.verify(token, process.env.APP_SECRET, (error, payload) => {
                if (error) return next(new Error("Socket.io Authentication Error."))
                socket.request.user = payload
            })
            return next()
        }
        return next(new Error("Socket.io Authentication Error."))
    })

    io.on('connection', (socket) => {

        users.push({ sock: socket.id, uid: socket.request.user.uid })

        messages = messages.filter((message) => {
            let user = users.find(user => user.uid == message.receiver)

            if (user) {
                io.to(user.sock).emit(message)
                return false
            }

            return true
        })


        io.on('conversation', async (data) => {
            if (data.receiver) {
                try {
                    let conversation = await ChatModel.find({
                        $or: [
                            {sender: socket.request.user._id, receiver: data.receiver},
                            {receiver: socket.request.user._id, sender: data.receiver}
                        ]
                    })

                    socket.emit('conversation', conversation)
                } catch (error) {
                    socket.emit('error', error)
                }
            } else {
                socket.emit('alert', 'invalid receiver id was provided')
            }
        })

        socket.on('message', async (data) => {
            if (data.message && data.receiver && socket.request.user._id != data.receiver) {

                try {

                    let user = users.find((user) => user.uid == data.receiver)

                    let message = await ChatModel({
                        message: data.message,
                        sender: socket.request.user._id,
                        receiver: data.receiver
                    }).save()

                    if (user) {
                        io.to(user.sock).emit('message', message)
                    } else {
                        messages.push(message)
                    }

                } catch (error) {
                    socket.emit('error', error)
                }

            } else {
                socket.emit('alert', 'something went wrong')
            }
        })

        socket.on('disconnect', () => {
            users = users.filter(
                o => o.socket !== socket.id
            )
        })

    })
}