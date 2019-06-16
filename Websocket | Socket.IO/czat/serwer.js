/* jshint node: true */
var express = require('express');
var app = express();
var httpServer = require("http").Server(app);
var io = require("socket.io")(httpServer);

var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.sockets.on("connection", function (socket) {
    socket.on("message", function (data) {
        io.sockets.emit("echo", socket.nick + " napisał: " + data);
    });
    socket.on('nick', function (data) {
       socket.nick =  data;
       socket.emit('nick_ok', socket.nick);
    });
    socket.on("error", function (err) {
        console.dir(err);
    });
    socket.on('loggedInServer', function () {
        io.sockets.emit('loggedIn', socket.nick) ;
    });
    socket.on('loggedOutServer', function (data) {
        io.sockets.emit('loggedOut', data) ;
    });
    socket.on('userWritingServer', function (data, nick) {
        var isUserTyping = data.length > 0;
        socket.broadcast.emit('userWriting', isUserTyping, nick);
    });
});

httpServer.listen(3000, function () {
    console.log('Serwer HTTP działa na porcie ' + 3000);
});