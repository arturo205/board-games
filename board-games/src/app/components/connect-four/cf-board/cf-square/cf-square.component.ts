import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from 'app/shared/services/multiplayer.service';
import { ServiceHelper } from 'app/shared/services/general/general-objects';
import { ConnectFourMove } from 'app/logic/connect-four/server/connect-four-move';

@Component({
    selector: 'app-cf-square',
    templateUrl: './cf-square.component.html',
    styleUrls: ['./cf-square.component.css']
})
export class CfSquareComponent implements OnInit {

    //public selectedClass: string;
    public customWidth: number;
    public customHeight: number;
    public customMargin: number;
    public id: number;

    constructor(public multiplayerService: MultiplayerService) {

        //this.selectedClass = "player-one";
        this.customWidth = 10;
        this.customHeight = 10;
        this.customMargin = 1;
        this.id = -1;

    }

    ngOnInit() { }

    public setWidthAndHeight(value: number): void {

        this.customHeight = value;
        this.customWidth = value;

    }

    public setMargin(value: number): void {

        this.customMargin = value;

    }

    public setId(id: number): void {

        this.id = id;

    }

    public onClick(): void {

        if (this.multiplayerService.connectFour.serverStatus.currentTurn.name === ServiceHelper.currentPlayer.name) {
            this.multiplayerService.connectFour.sendMove(new ConnectFourMove(ServiceHelper.currentPlayer, this.id));
            this.multiplayerService.localMessage = "";
        }
        else {
            this.multiplayerService.localMessage = ServiceHelper.currentPlayer.name + " please wait for your turn.";
        }

    }

    public getLayoutType(): string {

        let foundLayout: string = "";

        if (this.multiplayerService.connectFour.serverStatus.playersConnected.length === 2) {

            if (this.multiplayerService.connectFour.serverStatus.gameOver) {
                
                if (Object.values(this.multiplayerService.connectFour.serverStatus.winnerCombination).includes(this.id)) {
                    foundLayout = "winner";
                }
                else {
                    foundLayout = "nonWinner";
                }
            }
            else {
                if (this.multiplayerService.connectFour.localSquares[this.id] === "player1") {
                    foundLayout = "player1";
                }
                else if (this.multiplayerService.connectFour.localSquares[this.id] === "player2") {
                    foundLayout = "player2";
                }
                else if (this.multiplayerService.connectFour.localSquares[this.id] === 'empty') {
                    foundLayout = "empty";
                }
            }
        }
        else {
            foundLayout = "empty";
        }

        return foundLayout;
    }

}
