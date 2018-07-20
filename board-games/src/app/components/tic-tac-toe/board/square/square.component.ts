import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from '../../../../shared/services/multiplayer.service';
import { TicTacToeMove } from '../../../../logic/tic-tac-toe/server/tic-tac-toe-move';

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

        if (this.multiplayerService.serverTicTacToeStatus.currentTurn.name === this.multiplayerService.currentPlayer.name) {
            this.multiplayerService.performTicTacToeMove(new TicTacToeMove(this.multiplayerService.currentPlayer, this.key));
            this.multiplayerService.localMessage = "";
        }
        else {
            this.multiplayerService.localMessage = this.multiplayerService.currentPlayer.name + " please wait for your turn.";
        }

    }

    public getLayoutType(): string {

        let foundLayout: string = "";

        if (this.multiplayerService.serverTicTacToeStatus.playersConnected.length === 2) {

            if (this.multiplayerService.serverTicTacToeStatus.gameOver) {
                
                if (Object.values(this.multiplayerService.serverTicTacToeStatus.winnerCombination).includes(this.key)) {
                    foundLayout = "winner";
                }
                else {
                    foundLayout = "nonWinner";
                }
            }
            else {
                if (this.multiplayerService.localTicTacToeSquares[this.key] === this.multiplayerService.serverTicTacToeStatus.charactersFromPlayers[0]) {
                    foundLayout = "player1";
                }
                else if (this.multiplayerService.localTicTacToeSquares[this.key] === this.multiplayerService.serverTicTacToeStatus.charactersFromPlayers[1]) {
                    foundLayout = "player2";
                }
                else if (this.multiplayerService.localTicTacToeSquares[this.key] === ' ') {
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
