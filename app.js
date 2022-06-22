const app = require('./server')
const mongoose = require('mongoose')
const server = app.listen(9000, () => {
    console.log("Listening on port: " + 9000);
});
mongoose.connect('mongodb+srv://pavlosad:120798Pavlo@cluster0.yp6xw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let actChat;
let users = []

function addUser(userId, socketId) {
    !users.some((user) => user.userId === userId) &&
    users.push({userId, socketId})
}
function removeUser(socketId) {
    users = users.filter(user => user.socketId !== socketId)
}
io.on("connection", (socket) => {

    socket.on('addUser', (userId) => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })

    socket.on('joinRoom', (data) => {
        socket.join(data.activeChatId)
        actChat = data.activeChatId
    })

    socket.on('sendMessage', (data) => {
        socket.broadcast.to(data.conversationId).emit('receiveMessage', data)
    })

    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit("getUsers", users)
    })
})

