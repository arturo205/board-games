import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ComponentRef } from '@angular/core';
import { DynamicComponentService } from '../../../shared/services/dynamic-component.service';
import { CfSquareComponent } from './cf-square/cf-square.component';
import { DynamicComponents } from '../../../shared/DynamicComponents';
import { MultiplayerService } from 'app/shared/services/multiplayer.service';
import { ServiceHelper } from 'app/shared/services/general/general-objects';
import { Games } from 'app/logic/games';

@Component({
    selector: 'app-cf-board',
    templateUrl: './cf-board.component.html',
    styleUrls: ['./cf-board.component.css']
})
export class CfBoardComponent implements OnInit {
    @ViewChild('dynamicBoard', { read: ViewContainerRef }) dynamicBoard: ViewContainerRef;

    public dynamicComponentsService: DynamicComponentService;
    public dynamicSquares: Array<CfSquareComponent>;
    private maxWidth: number;
    private horizontalCount: number;
    private verticalCount: number;
    private squareMargin: number;
    private scoreWasRefreshed: boolean = false;

    constructor(@Inject(DynamicComponentService) dynamicComponentsService, public multiplayerService: MultiplayerService) {
        this.dynamicComponentsService = dynamicComponentsService;
        this.dynamicSquares = new Array<CfSquareComponent>();
        this.maxWidth = 600;
        this.horizontalCount = 7;
        this.verticalCount = 6;
        this.squareMargin = 2;
    }

    ngOnInit() { }

    ngAfterViewInit() {

        this.dynamicComponentsService.setRootViewContainerRef(this.dynamicBoard);
    
    }

    public drawBoard(width: number, height: number): void {

        this.dynamicComponentsService.removeAllDynamicElements();
        this.dynamicSquares.splice(0, this.dynamicSquares.length);

        this.horizontalCount = width;
        this.verticalCount = height;

        let squareWidth: number = 0;
        let newSquare: CfSquareComponent;
        let squaresTotal: number = this.horizontalCount * this.verticalCount;

        squareWidth = (this.maxWidth / this.horizontalCount) - (this.squareMargin * 2);

        for (let i = 0; i < squaresTotal; i++) {
            newSquare = this.dynamicComponentsService.addDynamicComponent(DynamicComponents.ConnectFourSquare);
            newSquare.setWidthAndHeight(squareWidth);
            newSquare.setMargin(this.squareMargin);
            newSquare.setId(i);
            this.dynamicSquares.push(newSquare);
        }

    }

    public getTurnColor(): string {

        let foundColor: string = "";

        if (this.multiplayerService.connectFour.serverStatus.playersConnected.length === 2) {

            if (this.multiplayerService.connectFour.serverStatus.gameOver) {
                foundColor = "green";
                this.refreshScore();
            }
            else {
                if (this.multiplayerService.connectFour.serverStatus.currentTurn.name === ServiceHelper.currentPlayer.name) {
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

        this.multiplayerService.connectFour.resetConnectFour();
        this.scoreWasRefreshed = false;

    }

    public playerJoined(): boolean {

        return ServiceHelper.joinedGame === Games.ConnectFour ? true : false;

    }

}
