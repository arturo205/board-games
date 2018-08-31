import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ComponentRef } from '@angular/core';
import { DynamicComponentService } from '../../../shared/services/dynamic-component.service';
import { CfSquareComponent } from './cf-square/cf-square.component';
import { DynamicComponents } from '../../../shared/DynamicComponents';

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

    constructor(@Inject(DynamicComponentService) dynamicComponentsService) {
        this.dynamicComponentsService = dynamicComponentsService;
        this.dynamicSquares = new Array<CfSquareComponent>();
        this.maxWidth = 500;
        this.horizontalCount = 10;
        this.verticalCount = 18;
        this.squareMargin = 2;
    }

    ngOnInit() { }

    ngAfterViewInit() {

        let squareWidth: number = 0;
        let newSquare: CfSquareComponent;
        let squaresTotal: number = this.horizontalCount * this.verticalCount;

        squareWidth = (this.maxWidth / this.horizontalCount) - (this.squareMargin * 2);

        this.dynamicComponentsService.setRootViewContainerRef(this.dynamicBoard);

        for (let i = 0; i < squaresTotal; i++) {
            newSquare = this.dynamicComponentsService.addDynamicComponent(DynamicComponents.ConnectFourSquare);
            newSquare.setWidthAndHeight(squareWidth);
            newSquare.setMargin(this.squareMargin);
            this.dynamicSquares.push(newSquare);
        }

    }

}
