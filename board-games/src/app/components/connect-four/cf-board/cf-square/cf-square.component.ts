import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from 'app/shared/services/multiplayer.service';
import { ServiceHelper } from 'app/shared/services/general/general-objects';

@Component({
    selector: 'app-cf-square',
    templateUrl: './cf-square.component.html',
    styleUrls: ['./cf-square.component.css']
})
export class CfSquareComponent implements OnInit {

    public selectedClass: string;
    public customWidth: number;
    public customHeight: number;
    public customMargin: number;
    public id: number;

    constructor(public multiplayerService: MultiplayerService) {

        this.selectedClass = "player-one";
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

        this.selectedClass = (this.selectedClass === "player-one") ? "player-two" : "player-one";

        if (this.multiplayerService.connectFourService.serverConnectFourStatus.currentTurn.name === ServiceHelper.currentPlayer.name) {
            //this.multiplayerService.performTicTacToeMove(new TicTacToeMove(this.multiplayerService.currentPlayer, this.key));
            this.multiplayerService.localMessage = "";
        }
        else {
            this.multiplayerService.localMessage = ServiceHelper.currentPlayer.name + " please wait for your turn.";
        }

    }

}
