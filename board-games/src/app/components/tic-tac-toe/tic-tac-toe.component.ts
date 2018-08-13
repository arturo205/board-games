import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { MultiplayerService } from '../../shared/services/multiplayer.service';
import { ModalService } from '../../shared/services/modal.service';
import { AllGames } from 'app/logic/games';
import { TicTacToeSummaryElement } from '../../logic/tic-tac-toe/server/tic-tac-toe-summary-element';

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

    public joinGame(gameId: number): void {

        this.multiplayerService.joinTicTacToeGame(gameId);

    }

    public leaveGame(): void {

        this.multiplayerService.leaveTicTacToe();

    }

    /**
     * Returns the status number for the tic-tac-toe game to handle buttons and logic
     * 
     * 0 - New game (not yet created or joined any instance)
     * 1 - Created and joined an instance (waiting for other player)
     * 2 - Playing the game with other player
     */
    public getGameStatus(): number {

        let status: number = -1;

        if (this.multiplayerService.serverTicTacToeStatus.playersConnected.length === 0) {
            status = 0;
        }
        else if (this.multiplayerService.serverTicTacToeStatus.playersConnected.length === 1) {
            status = 1;
        }
        else if (this.multiplayerService.serverTicTacToeStatus.playersConnected.length === 2) {
            status = 2;
        }

        return status;

    }

    public getSummaryGameStatus(summary: TicTacToeSummaryElement): number {

        let status: number = -1;

        if (summary.player1 !== null && summary.player2 === null) {
            status = 0;
        }
        else if (summary.player1 !== null && summary.player2 !== null) {
            status = 1;
        }

        return status;

    }

    public getPlayersMessage(): string {

        let message: string = "";

        switch (this.multiplayerService.serverTicTacToeStatus.playersConnected.length) {
            case 0: 
                message = "Waiting for players to join!"; 
                break;
            case 1: 
                message = " Waiting for an opponent!";
                break;
            case 2: 
                message = "Game in progress!";
                break;
            default: 
                message = "";
                break;
        }

        return message;

    }

    public getSummaryMessageForGameInstance(summary: TicTacToeSummaryElement) {

        let message: string = "";

        if (summary.player1 !== null && summary.player2 === null) {
            message = "Waiting for an opponent!";
        }
        else if (summary.player1 !== null && summary.player2 !== null) {
            message = "Game in progress!";
        }

        return message;

    }

    public createNewGame(): void {

        this.multiplayerService.newTicTacToeGame();

    }

    public getIconColor(id: number): string {

        return AllGames.getIconColor(id);

    }

    public getIconImage(id: number): string {

        return AllGames.getIconImage(id);

    }

}
