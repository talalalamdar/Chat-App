var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var port = 3333;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.use( express.static(__dirname + './dist') );

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


