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

    constructor(public multiplayerService: MultiplayerService) { }

    ngOnInit() { }

    ngAfterViewInit() {

        this.squares.forEach((square, key) => {
            square.key = key;
        });

    }

    public getTurnColor(): string {

        let foundColor: string = "";

        if (this.multiplayerService.serverTicTacToeStatus.playersConnected.length === 2) {

            if (this.multiplayerService.serverTicTacToeStatus.gameOver) {
                foundColor = "green";
            }
            else {
                if (this.multiplayerService.serverTicTacToeStatus.currentTurn.name === this.multiplayerService.currentPlayer.name) {
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

    public resetBoard(): void {

        this.multiplayerService.resetTicTacToe();

    }

    public playerJoined(): boolean {

        return this.multiplayerService.joinedGame === Games.TicTacToe ? true : false;

    }

}
