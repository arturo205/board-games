var http = require('http');
var path = require('path');
var express = require('express');
var app = express();



app.use(express.static(path.join(__dirname, 'dist/board-games')));

app.get('*', function(req, res, next) {
    res.sendFile(__dirname + "/dist/board-games/index.html");
});


var server = http.createServer(app);
var io = require('socket.io')(server);
let turns = [{
    user: ''
}]
let connectedPlayers = {
    p1: {
        connected: false,
        id: ""
    },
    p2: {
        connected: false,
        id: ""
    }
}
io.on('connection', function(socket) {
    console.log('First entry', socket)
    socket.emit('msg', { msg: 'Welcome bro!' + socket.id });
    socket.on('new player', () => {
        if (connectedPlayers.p1.connected === true) {
            connectedPlayers.p2 = {
                connected: true,
                id: socket.id
            }
        } else {
            connectedPlayers.p1 = {
                connected: true,
                id: socket.id
            }
        }
        console.log('Right now connected players', connectedPlayers)
        socket.emit('currentPlayers', connectedPlayers)
    })

    io.clients((error, clients) => {
        if (error) throw error;
        console.log("Currently connected", clients); // => [PZDoMHjiu8PYfRiKAAAF, Anw2LatarvGVVXEIAAAD]
    });
    socket.emit('id', socket.id);
    socket.on('msg', function(msg) {
        socket.emit('msg', { msg: "you sent : " + msg });
    })
    socket.on('msg', function(msg) {
        socket.broadcast.emit('msg', { msg: "Broadcast: " + msg });
    })
    socket.broadcast.emit('msg', { msg: "Broadcast1111: " + socket.id });
    socket.on('say to someone', function(id, msg) {
        socket.broadcast.to(id).emit('my message', msg);
    });
    socket.on('add move', function(data) {
        turns.push(data)
    });
    socket.on("whose turn", (player) => {
        console.log(turns, player, "trackkk")
        let tt = turns.map(t => t.user !== player)
        socket.emit('turn', tt[tt.length - 1])
        console.log(turns, tt, tt.length, tt[tt.length - 1], player, "trackkk")
    })
});

server.listen(8988);