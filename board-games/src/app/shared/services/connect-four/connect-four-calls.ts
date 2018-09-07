import { Injectable } from "@angular/core";
import { ConnectFourStatus } from "app/logic/connect-four/server/connect-four-status";
import { ConnectFourSummaryElement } from "app/logic/connect-four/server/connect-four-summary-element";
import { MultiplayerService } from "app/shared/services/multiplayer.service";
import { Observable } from "rxjs";
import { Games } from "app/logic/games";
import { ServiceHelper } from "app/shared/services/general/general-objects";

@Injectable()
export class ConnectFourService {

    public serverConnectFourStatus: ConnectFourStatus;
    public localConnectFourSquares: Array<string>;
    public connectFourSummary: ConnectFourSummaryElement;

    public constructor() {

        this.serverConnectFourStatus = new ConnectFourStatus(-1);
        this.localConnectFourSquares = new Array<string>();
        this.connectFourSummary = null;

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
            this.serverConnectFourStatus = status;
            this.updateLocalConnectFourObjects();
        });

    }

    private updateLocalConnectFourObjects(): void {

        ServiceHelper.joinedGame = this.playerJoinedConnectFour() ? Games.ConnectFour : null;

        this.serverConnectFourStatus.squaresStatus.forEach((serverPlayerObj, index) => {
            
            if (serverPlayerObj !== null && this.serverConnectFourStatus.playersConnected.length === 2) {
                if (serverPlayerObj.name === this.serverConnectFourStatus.playersConnected[0].name) {
                    this.localConnectFourSquares[index] = "player1";
                }
                else if (serverPlayerObj.name === this.serverConnectFourStatus.playersConnected[1].name) {
                    this.localConnectFourSquares[index] = "player2";
                }
            }
            else if (serverPlayerObj === null && this.serverConnectFourStatus.playersConnected.length === 2) {
                this.localConnectFourSquares[index] = "empty";
            }
        });

    }

    private playerJoinedConnectFour(): boolean {

        let playerIsInArray: boolean = false;

        this.serverConnectFourStatus.playersConnected.forEach(player => {
            if (player.name === ServiceHelper.currentPlayer.name) {
                playerIsInArray = true;
            }
        });

        return playerIsInArray;

    }

}