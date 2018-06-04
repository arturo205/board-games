import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ng-socket-io';

import { map } from 'rxjs/operators';

const config: SocketIoConfig = { url: 'http://localhost:4200', options: {} };

@Injectable({
    providedIn: 'root'
})
export class MultiplayerService {
    playerid;
    players;
    myTurn;
    pid;

    constructor(private socket: Socket) {
        this.getMyId()
        .subscribe(id => {
            console.log(this.pid, id, 'testiqwqwqwng ids');
            this.pid = id;
        });
    }

    getMyId() {
        return this.socket
            .fromEvent<any>('id')
            .pipe(map(data => {
                console.log(data, 'is myb player id');
                return data;
            }));
    }

    sendNewPlayer() {
        this.socket.emit('new player');
    }

    sendMessage1(msg: string) {
        this.socket.on('connection', () => {
            this.socket.emit('AAAAA');
        });
    }

    getMessage() {
        return this.socket
            .fromEvent<any>('msg')
            .pipe(map(data => data.msg));
    }

    getTurn() {
        return this.socket
            .fromEvent<any>('turn')
            .pipe(map(data => data));
    }

    getMessageToSomeone() {
        return this.socket
            .fromEvent<any>('say to someone')
            .pipe(map(data => {
                console.log('saying to someone', data);
                return data;
            }));
    }

    getPlayers() {
        return this.socket
            .fromEvent<any>('currentPlayers')
            .pipe(map(data => {
                console.log('Building players', data);
                return data;
            }));
    }

    getConnection() {
        return this.socket
            .fromEvent<any>('connection')
            .pipe(map(ret => console.log('wwwww', ret)));
        // .on('connection', () => {
        //     this.socket
        //         .broadcast.emit('msg', 'A new challenger has arrived!');
        //     this.socket.on('new player', function () {
        //         this.players[0].id = this.socket.flags.id;
        //     });
        // })
    }

    sendConnection() {
        this.socket.emit('connection', 'Conected!!');
    }

    sendMessage(msg: string) {
        console.log('Subsccribers', this.socket.subscribersCounter);
        console.log('Subsccribers', this.socket.ioSocket);
        this.socket
            .emit('msg', 'qqqq' + msg);
    }

    getConnected() {
        return this.socket
            .fromEvent<any>('getConnected')
            .pipe(map(data => {
                console.log('Connected people', data);
                return data;
            }));
    }

    sendConnected(getConnected: string[]) {
        this.socket
            .emit('getConnected', getConnected);
    }

    sendMessageToSomeone(id, msg: string) {
        console.log('Subsccribers', this.socket.subscribersCounter);
        console.log('Subsccribers', this.socket.ioSocket);
        this.socket
            .emit('say to someone', 'qqqqsadadsadsad');
    }

    getState() {
        this.socket.on('new player', function (players) {
            console.log('ppppp', players);
        });
    }

    public validateTurn(playerid) {
        this.socket.emit('whose turn', playerid);
        this.socket.on('turn', (data) => {
            this.myTurn = data;
        });
    }

    public addTurn(playerid) {
        this.socket.emit('add move', {user: playerid});
    }
}
