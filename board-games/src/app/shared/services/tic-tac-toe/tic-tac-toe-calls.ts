import { Injectable } from "@angular/core";
import { TicTacToeStatus } from "app/logic/tic-tac-toe/server/tic-tac-toe-status";
import { TicTacToeSummaryElement } from "app/logic/tic-tac-toe/server/tic-tac-toe-summary-element";
import { Observable } from "rxjs";
import { SystemMessage } from "app/shared/system-message";
import { TicTacToeMove } from "app/logic/tic-tac-toe/server/tic-tac-toe-move";
import { MultiplayerService } from "app/shared/services/multiplayer.service";
import { Games } from "app/logic/games";
import { ServiceHelper } from "app/shared/services/general/general-objects";

@Injectable()
export class TicTacToeService {

    public serverTicTacToeStatus: TicTacToeStatus;
    public localTicTacToeSquares: Array<string>;
    public ticTacToeSummary: TicTacToeSummaryElement;

    public constructor() {

        this.serverTicTacToeStatus = new TicTacToeStatus(-1);
        this.localTicTacToeSquares = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        this.ticTacToeSummary = null;

    }

    public newTicTacToeGame(): void {
        ServiceHelper.socket.emit('newTicTacToe', ServiceHelper.currentPlayer);
    }

    public joinTicTacToeGame(gameId: number): void {
        ServiceHelper.socket.emit('joinTicTacToe', ServiceHelper.currentPlayer, gameId);
    }

    public onTicTacToeStatus(): Observable<TicTacToeStatus> {
        return new Observable<TicTacToeStatus>(observer => {
            ServiceHelper.socket.on('ticTacToeStatus', (status: TicTacToeStatus) => observer.next(status));
        });
    }

    public onTicTacToeSystemMessage(): Observable<SystemMessage> {
        return new Observable<SystemMessage>(observer => {
            ServiceHelper.socket.on('ticTacToeSystemMessage', (message: SystemMessage) => observer.next(message));
        });
    }

    public performTicTacToeMove(move: TicTacToeMove): void {
        ServiceHelper.socket.emit('performTicTacToeMove', move, this.serverTicTacToeStatus.gameId);
    }

    public resetTicTacToe(): void {
        ServiceHelper.socket.emit('resetTicTacToe', this.serverTicTacToeStatus.gameId);
    }

    public leaveTicTacToe(): void {
        ServiceHelper.socket.emit('leaveTicTacToe', ServiceHelper.currentPlayer, this.serverTicTacToeStatus.gameId);
        ServiceHelper.joinedGame = null;
        this.serverTicTacToeStatus = new TicTacToeStatus(-1);
    }

    public onTicTacToeSummary(): Observable<TicTacToeSummaryElement> {
        return new Observable<TicTacToeSummaryElement>(observer => {
            ServiceHelper.socket.on('ticTacToeSummary', (summaryElement: TicTacToeSummaryElement) => observer.next(summaryElement));
        });
    }

    public saveTicTacToeScore(score: number): void {
        ServiceHelper.socket.emit('ticTacToeSaveScore', ServiceHelper.currentPlayer, score);
    }

    public addListeners(): void {

        this.onTicTacToeStatus().subscribe((status: TicTacToeStatus) => {
            this.serverTicTacToeStatus = status;
            this.updateLocalTicTacToeObjects();
        });

        this.onTicTacToeSystemMessage().subscribe((message: SystemMessage) => {
            this.serverTicTacToeStatus.systemMessage = message;
        });

        this.onTicTacToeSummary().subscribe((summaryElement: TicTacToeSummaryElement) => {
            this.ticTacToeSummary = summaryElement;
        });

    }

    private updateLocalTicTacToeObjects(): void {

        ServiceHelper.joinedGame = this.playerJoinedTicTacToe() ? Games.TicTacToe : null;

        this.serverTicTacToeStatus.squaresStatus.forEach((serverPlayerObj, index) => {
            
            if (serverPlayerObj !== null && this.serverTicTacToeStatus.playersConnected.length === 2 && this.serverTicTacToeStatus.charactersFromPlayers.length == 2) {
                if (serverPlayerObj.name === this.serverTicTacToeStatus.playersConnected[0].name) {
                    this.localTicTacToeSquares[index] = this.serverTicTacToeStatus.charactersFromPlayers[0];
                }
                else if (serverPlayerObj.name === this.serverTicTacToeStatus.playersConnected[1].name) {
                    this.localTicTacToeSquares[index] = this.serverTicTacToeStatus.charactersFromPlayers[1];
                }
            }
            else if (serverPlayerObj === null && this.serverTicTacToeStatus.playersConnected.length === 2 && this.serverTicTacToeStatus.charactersFromPlayers.length == 2) {
                this.localTicTacToeSquares[index] = " ";
            }
        });

    }

    private playerJoinedTicTacToe(): boolean {

        let playerIsInArray: boolean = false;

        this.serverTicTacToeStatus.playersConnected.forEach(player => {
            if (player.name === ServiceHelper.currentPlayer.name) {
                playerIsInArray = true;
            }
        });

        return playerIsInArray;

    }

}
