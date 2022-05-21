const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth')
const conversationRoute = require('./routes/conversation');
const messagesRoute = require('./routes/messages');
const mongoose = require('mongoose')
const teamsRoute = require('./routes/teams');
const groupsRoute = require('./routes/group');
const downloadFileRoute = require('./routes/fileDownload')
const cors = require('cors');


const io = require('socket.io')(8000, {
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


mongoose.connect('mongodb+srv://pavlosad:120798Pavlo@cluster0.yp6xw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const store = new session.MemoryStore();

const app = express();


app.use(session({
    secret: 'secret',
    resave: true,
    cookie: {maxAge: 60000},
    saveUninitialized: false,
    store
}));
app.use(cors())
app.use(function(req, res, next){

    next();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use('/uploads',express.static('uploads'))

app.use('/users', usersRoute);
app.use('/auth', authRoute);
app.use('/conversations', conversationRoute);
app.use('/messages', messagesRoute);
app.use('/teams', teamsRoute);
app.use('/groups', groupsRoute);
app.use('/fileDownload', downloadFileRoute);

app.listen(9000, (err) => {
    if(err){
        throw Error(err);
    }
});
