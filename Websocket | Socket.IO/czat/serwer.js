/* jshint node: true */
var express = require('express');
var app = express();
var httpServer = require("http").Server(app);
var io = require("socket.io")(httpServer);

var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

io.sockets.on("connection", function (socket) {
    socket.on("message", function (data) {
        io.sockets.emit("echo", "No tak, tak – dostałem: " + data);
    });
    socket.on("error", function (err) {
        console.dir(err);
    });
});

httpServer.listen(3000, function () {
    console.log('Serwer HTTP działa na porcie ' + 3000);
});
