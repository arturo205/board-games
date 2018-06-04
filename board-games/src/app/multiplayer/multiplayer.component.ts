import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from './multiplayer.service';
// import gameRules from './../logic/tic-tac-toe/game-rules';

@Component({
    selector: 'app-multiplayer',
    templateUrl: './multiplayer.component.html',
    styleUrls: ['./multiplayer.component.css']
})
export class MultiplayerComponent implements OnInit {
    msg: string;
    pid: string;
    con: boolean;
    myTurn;
    players = {
        p1: {
            connected: false,
            id: ''
        },
        p2: {
            connected: false,
            id: ''
        }
    };

    constructor(private multiplayerService: MultiplayerService) { }

    ngOnInit() {
        this.sendConnection();
        this.multiplayerService
            .getMessage()
            .subscribe(msg => {
                this.msg = '1st ' + msg;
                console.log('Socket working', msg);
            });
        this.multiplayerService
            .getPlayers()
            .subscribe(currentPlayers => {
                console.log('Socket working111', this.players);
            });
        this.multiplayerService
            .getTurn()
            .subscribe(turn => {
                console.log(turn);
                this.myTurn = turn;
            });
        this.multiplayerService
            .getMyId()
            .subscribe(id => {
                console.log(this.pid, id, 'testing ids');
                this.pid = id;
            });
        this.multiplayerService.sendNewPlayer();
    }

    sendConnection() {
        this.multiplayerService.sendConnection();
    }

    sendMsg(msg) {
        this.multiplayerService.sendMessage(msg);
    }

    sendMsgToSomeone(id, msg) {
        this.multiplayerService.getConnected();
    }

    validateTurn() {
        this.multiplayerService.validateTurn(this.pid);
    }
}
