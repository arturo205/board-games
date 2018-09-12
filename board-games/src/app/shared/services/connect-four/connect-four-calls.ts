import { Injectable } from "@angular/core";
import { ConnectFourStatus } from "app/logic/connect-four/server/connect-four-status";
import { summaryElement } from "app/logic/connect-four/server/connect-four-summary-element";
import { Observable } from "rxjs";
import { Games } from "app/logic/games";
import { ServiceHelper } from "app/shared/services/general/general-objects";

@Injectable()
export class ConnectFourService {

    public serverStatus: ConnectFourStatus;
    public localSquares: Array<string>;
    public summary: summaryElement;

    public constructor() {

        this.serverStatus = new ConnectFourStatus(-1);
        this.localSquares = new Array<string>();
        this.summary = null;

    }

    public newConnectFourGame(boardWidth: number, boardHeight: number): void {
        ServiceHelper.socket.emit('newConnectFour', ServiceHelper.currentPlayer, boardWidth, boardHeight);
    }

    public joinConnectFourGame(gameId: number): void {
        ServiceHelper.socket.emit('joinConnectFour', ServiceHelper.currentPlayer, gameId);
    }

    public onConnectFourStatus(): Observable<ConnectFourStatus> {
        return new Observable<ConnectFourStatus>(observer => {
            ServiceHelper.socket.on('connectFourStatus', (status: ConnectFourStatus) => observer.next(status));
        });
    }

    public addListeners(): void {

        this.onConnectFourStatus().subscribe((status: ConnectFourStatus) => {
            this.serverStatus = status;
            this.updateLocalConnectFourObjects();
        });

    }

    private updateLocalConnectFourObjects(): void {

        ServiceHelper.joinedGame = this.playerJoinedConnectFour() ? Games.ConnectFour : null;

        this.serverStatus.squaresStatus.forEach((serverPlayerObj, index) => {
            
            if (serverPlayerObj !== null && this.serverStatus.playersConnected.length === 2) {
                if (serverPlayerObj.name === this.serverStatus.playersConnected[0].name) {
                    this.localSquares[index] = "player1";
                }
                else if (serverPlayerObj.name === this.serverStatus.playersConnected[1].name) {
                    this.localSquares[index] = "player2";
                }
            }
            else if (serverPlayerObj === null && this.serverStatus.playersConnected.length === 2) {
                this.localSquares[index] = "empty";
            }
        });

    }

    private playerJoinedConnectFour(): boolean {

        let playerIsInArray: boolean = false;

        this.serverStatus.playersConnected.forEach(player => {
            if (player.name === ServiceHelper.currentPlayer.name) {
                playerIsInArray = true;
            }
        });

        return playerIsInArray;

    }

}