import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from '../../../../shared/services/multiplayer.service';
import { TicTacToeMove } from '../../../../logic/tic-tac-toe/server/tic-tac-toe-move';
import { ServiceHelper } from 'app/shared/services/general/general-objects';

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

    public key: number;

    constructor(public multiplayerService: MultiplayerService) {
        this.key = 0;
    }

    ngOnInit() { }

    public onClick(): void {

        if (this.multiplayerService.ticTacToe.serverStatus.currentTurn.name === ServiceHelper.currentPlayer.name) {
            this.multiplayerService.ticTacToe.performTicTacToeMove(new TicTacToeMove(ServiceHelper.currentPlayer, this.key));
            this.multiplayerService.localMessage = "";
        }
        else {
            this.multiplayerService.localMessage = ServiceHelper.currentPlayer.name + " please wait for your turn.";
        }

    }

    public getLayoutType(): string {

        let foundLayout: string = "";

        if (this.multiplayerService.ticTacToe.serverStatus.playersConnected.length === 2) {

            if (this.multiplayerService.ticTacToe.serverStatus.gameOver) {
                
                if (Object.values(this.multiplayerService.ticTacToe.serverStatus.winnerCombination).includes(this.key)) {
                    foundLayout = "winner";
                }
                else {
                    foundLayout = "nonWinner";
                }
            }
            else {
                if (this.multiplayerService.ticTacToe.localSquares[this.key] === this.multiplayerService.ticTacToe.serverStatus.charactersFromPlayers[0]) {
                    foundLayout = "player1";
                }
                else if (this.multiplayerService.ticTacToe.localSquares[this.key] === this.multiplayerService.ticTacToe.serverStatus.charactersFromPlayers[1]) {
                    foundLayout = "player2";
                }
                else if (this.multiplayerService.ticTacToe.localSquares[this.key] === ' ') {
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
