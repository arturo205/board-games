import { Component, OnInit } from '@angular/core';

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

    constructor() {

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

    }

}
