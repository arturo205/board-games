import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { MultiplayerService } from '../../shared/services/multiplayer.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
    selector: 'app-tic-tac-toe',
    templateUrl: './tic-tac-toe.component.html',
    styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
    @ViewChild('board') board: BoardComponent;

    constructor(public multiplayerService: MultiplayerService, private modalService: ModalService) { }

    ngOnInit() { }

    public restartGame(): void {

        this.board.resetBoard();

    }

    public joinGame(): void {

        this.multiplayerService.joinTicTacToeGame();

    }

    public leaveGame(): void {

        this.multiplayerService.leaveTicTacToe();

    }

    public getPlayersMessage(): string {

        let message: string = "";

        switch (this.multiplayerService.serverTicTacToeStatus.playersConnected.length) {
            case 0: 
                message = "Waiting for players to join!"; 
                break;
            case 1: 
                message = this.multiplayerService.serverTicTacToeStatus.playersConnected[0].name;
                message += " joined! Waiting for 1 more player";
                break;
            case 2: 
                message = "2 players joined! Current game: ";
                message += this.multiplayerService.serverTicTacToeStatus.playersConnected[0].name;
                message += " vs ";
                message += this.multiplayerService.serverTicTacToeStatus.playersConnected[1].name;
                break;
            default: 
                message = "";
                break;
        }

        return message;

    }

}
