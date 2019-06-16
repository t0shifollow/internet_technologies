/* jshint browser: true, globalstrict: true, devel: true */
/* global io: false */
"use strict";

// Inicjalizacja
document.addEventListener("DOMContentLoaded", function (event) {
    var status = document.getElementById("status");
    var open = document.getElementById("open");
    var close = document.getElementById("close");
    var send = document.getElementById("send");
    var text = document.getElementById("text");
    var message = document.getElementById("message");
    var nick = document.getElementById('nick');
    var typingUser = document.getElementById('typingUser');
    var socket;

    status.textContent = "Brak połącznia";
    close.disabled = true;
    send.disabled = true;

    // Po kliknięciu guzika „Połącz” tworzymy nowe połączenie WS
    open.addEventListener("click", function (event) {
        open.disabled = true;
        if (!socket || !socket.connected) {
            socket = io({forceNew: true});
        }
        socket.on('connect', function () {
            socket.emit('nick', nick.value);
        });

        socket.on('nick_ok', function () {
            close.disabled = false;
            send.disabled = false;
            socket.emit('loggedInServer', nick.value);
            status.src = "img/bullet_green.png";
            console.log('Nawiązano połączenie przez Socket.io');
        });
        socket.on('disconnect', function () {
            open.disabled = false;
            status.src = "img/bullet_red.png";
            console.log('Połączenie przez Socket.io zostało zakończone');
        });
        socket.on("error", function (err) {
            message.textContent = "Błąd połączenia z serwerem: '" + JSON.stringify(err) + "'";
        });
        socket.on("echo", function (data) {
            message.innerHTML =  message.innerHTML + '<p>' +
                data + '</p>';
        });
        socket.on('loggedIn', function (data) {
            message.innerHTML = message.innerHTML + '<p>Kto jest z nami?: ' + data + '</p>';
        });
        socket.on('loggedOut', function (data) {
            message.innerHTML = message.innerHTML + '<p>Kto się uciekł?: ' + data + '</p>';
        });
        socket.on('userWriting', function (isUserTyping, nick) {
            if (isUserTyping) {
                typingUser.innerText = nick + ' drukuje coś..'
            } else {
                typingUser.innerText = '';
            }
        })
    });

    text.addEventListener('keypress', function () {
        socket.emit('userWritingServer', text.value, nick.value);
    });
    
    // Zamknij połączenie po kliknięciu guzika „Rozłącz”
    close.addEventListener("click", function (event) {
        socket.emit('loggedOutServer', nick.value);
        close.disabled = true;
        send.disabled = true;
        open.disabled = false;
        message.textContent = "";
        socket.io.disconnect();
        console.dir(socket);
    });

    // Wyślij komunikat do serwera po naciśnięciu guzika „Wyślij”
    send.addEventListener("click", function (event) {
        socket.emit('message', text.value);
        console.log('Wysłałem wiadomość: ' + text.value);
        text.value = "";
    });
});