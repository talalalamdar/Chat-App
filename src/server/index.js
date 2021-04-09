const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3333;

app.use( express.static(__dirname + '../../dist') );
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '../../public/index.html');
});

io.on('connection', function (socket) {
    let user = '';
    let room = '';

    socket.on('USER_SIGNEDUP', function(data) {
        user = data.userName
    });

    socket.on('JOINED_ROOM', function (data) {
        socket.join(data.room);
        room = data.room
        io.sockets.in(data.room).emit('NEW_MESSAGE', { connected: true, userName: data.userName });
    });

    socket.on('SEND_MESSAGE', function (data) {
        io.sockets.in(data.room).emit('NEW_MESSAGE', data);
    });

    socket.on('USER_TYPING', function (data) {
        socket.broadcast.in(data.room).emit('USER_TYPING', { userName: data.userName });
    });

    socket.on('disconnect', function () {
        if (user) {
            io.sockets.in(room).emit('NEW_MESSAGE', { connected: false, userName: user });
        }
    });
});

http.listen(port, () => {
    console.log('Listening on port ' + port);
});


