const jwt = require('jsonwebtoken')
const socketIO = require('socket.io')
const ChatModel = require('../models/chat')
const AccountModel = require('../models/account')


module.exports = (server) => {
    let users = []
    let messages = []

    const io = socketIO(server)

    io.use(async (socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            const token = socket.handshake.query.token
            await jwt.verify(token, process.env.APP_SECRET,  async (error, payload) => {
                if (error) return next(new Error("Socket.io Authentication Error."))
                console.log(payload)
                let user = await AccountModel.findOne({ uid: payload.uid })
                if (user) {
                    socket.request.user = user
                } else {
                    return next(new Error("Socket.io Authentication Error."))
                }
            })
            return next()
        }
        return next(new Error("Socket.io Authentication Error."))
    })

    io.on('connection', (socket) => {

        users.push({ sock: socket.id, _id: socket.request.user._id })

        messages = messages.filter((message) => {
            let user = users.find(user => user._id == message.receiver)

            if (user) {
                io.sockets.to(user.sock).emit(message)
                return false
            }

            return true
        })


        socket.on('participants', async (data) => {
            try {
                let participants = []

                console.log(socket.request.user._id)
                let results = await ChatModel.find({
                    $or: [
                        {sender: socket.request.user._id},
                        {receiver: socket.request.user._id}
                    ]
                })


                for(let result of results) {


                    if (result.sender && result.sender._id.toString() == socket.request.user._id.toString()) {
                        if (result.receiver)
                            participants.push(result.receiver)
                    } else {
                        if (result.sender)
                            participants.push(result.sender)
                    }

                }
                participants = participants.reduce((acc, current) => {
                    const x = acc.find(item => item._id.toString() === current._id.toString());
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);

                socket.emit('participants', participants)

            } catch (error) {
                socket.emit('error', error)
            }
        })

        socket.on('conversation', async (data) => {
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

                    console.log(users)

                    let user = users.find((user) => user._id == data.receiver)



                    console.log('user', user)
                    let message = await ChatModel({
                        message: data.message,
                        sender: socket.request.user._id,
                        receiver: data.receiver
                    }).save()

                    if (user) {
                        io.sockets.to(user.sock).emit('message', message)
                        console.log(user.sock)
                    } else {
                        messages.push(message)
                    }
                    socket.emit('message', message)

                } catch (error) {
                    socket.emit('error', error)
                }

            } else {
                socket.emit('alert', 'something went wrong')
            }
        })

        socket.on('disconnect', () => {
            users = users.filter(
                user => user.sock !== socket.id
            )
        })

    })
}