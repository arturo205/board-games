import { Component, OnInit, ViewChild } from '@angular/core';
import { CfBoardComponent } from 'app/components/connect-four/cf-board/cf-board.component';
import { MultiplayerService } from 'app/shared/services/multiplayer.service';
import { ModalService } from 'app/shared/services/modal.service';
import { AllGames } from 'app/logic/games';
import { ConnectFourSummaryElement } from 'app/logic/connect-four/server/connect-four-summary-element';

@Component({
    selector: 'app-connect-four',
    templateUrl: './connect-four.component.html',
    styleUrls: ['./connect-four.component.css']
})
export class ConnectFourComponent implements OnInit {
    @ViewChild('board') board: CfBoardComponent;

    public boardWidthChoices: Array<number> = [7, 8, 9, 10, 11, 12, 13, 14, 15];
    public boardHeightChoices: Array<number> = [6, 7, 8, 9, 10, 11, 12];
    private boardDrawn: boolean = false;

    constructor(public multiplayerService: MultiplayerService, private modalService: ModalService) { }

    ngOnInit() {

        this.multiplayerService.loadCurrentGameScore();

    }

    public restartGame(): void {

        this.board.resetBoard();

    }

    public joinGame(gameId: number): void {

        this.multiplayerService.connectFour.joinConnectFourGame(gameId);

    }

    public leaveGame(): void {

        this.multiplayerService.connectFour.leaveConnectFour();

    }

    /**
     * Returns the status number for the tic-tac-toe game to handle buttons and logic
     * 
     * 0 - New game (not yet created or joined any instance)
     * 1 - Created and joined an instance (waiting for other player)
     * 2 - Playing the game with other player
     */
    public getGameStatus(): number {

        let status: number = -1;

        if (this.multiplayerService.connectFour.serverStatus.playersConnected.length === 0) {
            status = 0;
            this.boardDrawn = false;
        }
        else if (this.multiplayerService.connectFour.serverStatus.playersConnected.length === 1) {
            status = 1;
            this.boardDrawn = false;
        }
        else if (this.multiplayerService.connectFour.serverStatus.playersConnected.length === 2) {
            status = 2;
            if (this.boardDrawn === false && this.board != undefined && this.board != null) {
                this.board.drawBoard(this.multiplayerService.connectFour.serverStatus.boardWidth, this.multiplayerService.connectFour.serverStatus.boardHeight);
                this.boardDrawn = true;
            }
        }

        return status;

    }

    public getSummaryGameStatus(summary: ConnectFourSummaryElement): number {

        let status: number = -1;

        if (summary.player1 !== null && summary.player2 === null) {
            status = 0;
        }
        else if (summary.player1 !== null && summary.player2 !== null) {
            status = 1;
        }

        return status;

    }

    public getPlayersMessage(): string {

        let message: string = "";

        switch (this.multiplayerService.connectFour.serverStatus.playersConnected.length) {
            case 0:
                message = "Waiting for players to join!";
                break;
            case 1:
                message = " Waiting for an opponent!";
                break;
            case 2:
                message = "Game in progress!";
                break;
            default:
                message = "";
                break;
        }

        return message;

    }

    public getSummaryMessageForGameInstance(summary: ConnectFourSummaryElement) {

        let message: string = "";

        if (summary.player1 !== null && summary.player2 === null) {
            message = "Waiting for an opponent!";
        }
        else if (summary.player1 !== null && summary.player2 !== null) {
            message = "Game in progress!";
        }

        return message;

    }

    public createNewGame(): void {

        let boardWidth: number = this.getValueFromSelect("boardWidthSelect");
        let boardHeight =  this.getValueFromSelect("boardHeightSelect");
        this.multiplayerService.connectFour.newConnectFourGame(boardWidth, boardHeight);

    }

    private getValueFromSelect(elementName: string): number {

        let boardWidthSelect: HTMLSelectElement = document.querySelector('select[name=' + elementName + ']');
        return parseInt(boardWidthSelect.options[boardWidthSelect.selectedIndex].value);

    }

    public getIconColor(id: number): string {

        return AllGames.getIconColor(id);

    }

    public getIconImage(id: number): string {

        return AllGames.getIconImage(id);

    }

    public getRanking(): void {

        this.multiplayerService.getHighestScores(10);
        this.modalService.open("connect-four-ranking");

    }

    public closeModal(id: string): void {

        this.modalService.close(id);

    }

    public openInstructions(): void {

        this.modalService.open("connect-four-instructions");

    }

    public openScoreChart(): void {

        this.modalService.open("connect-four-score");

    }

}
