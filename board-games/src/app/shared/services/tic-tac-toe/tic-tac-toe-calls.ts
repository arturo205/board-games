import { Injectable } from "@angular/core";
import { TicTacToeStatus } from "app/logic/tic-tac-toe/server/tic-tac-toe-status";
import { summaryElement } from "app/logic/tic-tac-toe/server/tic-tac-toe-summary-element";
import { Observable } from "rxjs";
import { SystemMessage } from "app/shared/system-message";
import { TicTacToeMove } from "app/logic/tic-tac-toe/server/tic-tac-toe-move";
import { Games } from "app/logic/games";
import { ServiceHelper } from "app/shared/services/general/general-objects";

@Injectable()
export class TicTacToeService {

    public serverStatus: TicTacToeStatus;
    public localSquares: Array<string>;
    public summary: summaryElement;

    public constructor() {

        this.serverStatus = new TicTacToeStatus(-1);
        this.localSquares = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        this.summary = null;

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
        ServiceHelper.socket.emit('performTicTacToeMove', move, this.serverStatus.gameId);
    }

    public resetTicTacToe(): void {
        ServiceHelper.socket.emit('resetTicTacToe', this.serverStatus.gameId);
    }

    public leaveTicTacToe(): void {
        ServiceHelper.socket.emit('leaveTicTacToe', ServiceHelper.currentPlayer, this.serverStatus.gameId);
        ServiceHelper.joinedGame = null;
        this.serverStatus = new TicTacToeStatus(-1);
    }

    public onsummary(): Observable<summaryElement> {
        return new Observable<summaryElement>(observer => {
            ServiceHelper.socket.on('ticTacToeSummary', (summaryElement: summaryElement) => observer.next(summaryElement));
        });
    }

    public saveTicTacToeScore(score: number): void {
        ServiceHelper.socket.emit('ticTacToeSaveScore', ServiceHelper.currentPlayer, score);
    }

    public addListeners(): void {

        this.onTicTacToeStatus().subscribe((status: TicTacToeStatus) => {
            this.serverStatus = status;
            this.updateLocalTicTacToeObjects();
        });

        this.onTicTacToeSystemMessage().subscribe((message: SystemMessage) => {
            this.serverStatus.systemMessage = message;
        });

        this.onsummary().subscribe((summaryElement: summaryElement) => {
            this.summary = summaryElement;
        });

    }

    private updateLocalTicTacToeObjects(): void {

        ServiceHelper.joinedGame = this.playerJoinedTicTacToe() ? Games.TicTacToe : null;

        this.serverStatus.squaresStatus.forEach((serverPlayerObj, index) => {
            
            if (serverPlayerObj !== null && this.serverStatus.playersConnected.length === 2 && this.serverStatus.charactersFromPlayers.length == 2) {
                if (serverPlayerObj.name === this.serverStatus.playersConnected[0].name) {
                    this.localSquares[index] = this.serverStatus.charactersFromPlayers[0];
                }
                else if (serverPlayerObj.name === this.serverStatus.playersConnected[1].name) {
                    this.localSquares[index] = this.serverStatus.charactersFromPlayers[1];
                }
            }
            else if (serverPlayerObj === null && this.serverStatus.playersConnected.length === 2 && this.serverStatus.charactersFromPlayers.length == 2) {
                this.localSquares[index] = " ";
            }
        });

    }

    private playerJoinedTicTacToe(): boolean {

        let playerIsInArray: boolean = false;

        this.serverStatus.playersConnected.forEach(player => {
            if (player.name === ServiceHelper.currentPlayer.name) {
                playerIsInArray = true;
            }
        });

        return playerIsInArray;

    }

}
