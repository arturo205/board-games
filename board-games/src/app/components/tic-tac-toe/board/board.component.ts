import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { SquareComponent } from './square/square.component';
import { MultiplayerService } from '../../../shared/services/multiplayer.service';
import { Games } from 'app/logic/games';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
    @ViewChildren('squares') squares: QueryList<SquareComponent>;

    public welcomeMessage: string = "Welcome to Tic-Tac-Toe!";
    private scoreWasRefreshed: boolean = false;

    constructor(public multiplayerService: MultiplayerService) { }

    ngOnInit() { }

    ngAfterViewInit() {

        this.squares.forEach((square, key) => {
            square.key = key;
        });

    }

    public getTurnColor(): string {

        let foundColor: string = "";

        if (this.multiplayerService.ticTacToeService.serverTicTacToeStatus.playersConnected.length === 2) {

            if (this.multiplayerService.ticTacToeService.serverTicTacToeStatus.gameOver) {
                foundColor = "green";
                this.refreshScore();
            }
            else {
                if (this.multiplayerService.ticTacToeService.serverTicTacToeStatus.currentTurn.name === MultiplayerService.currentPlayer.name) {
                    foundColor = "blue";
                }
                else {
                    foundColor = "red";
                }
            } 
        }
        else {
            foundColor = "red";
        }

        return foundColor;
    }

    public refreshScore(): void {

        if (this.scoreWasRefreshed === false) {
            this.scoreWasRefreshed = true;
            this.multiplayerService.loadCurrentGameScore();
        }

    }

    public resetBoard(): void {

        this.multiplayerService.ticTacToeService.resetTicTacToe();
        this.scoreWasRefreshed = false;

    }

    public playerJoined(): boolean {

        return MultiplayerService.joinedGame === Games.TicTacToe ? true : false;

    }

}
