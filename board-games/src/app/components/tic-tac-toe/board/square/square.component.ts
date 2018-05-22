import { Component, OnInit } from '@angular/core';
import { TicTacToeLogic } from 'app/logic/tic-tac-toe/game-rules';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  public key: number;
  public squareValue: string;

  constructor() {
    this.key = -1;
    this.squareValue = " ";
  }

  ngOnInit() { }

  public onClick(): void {
    TicTacToeLogic.performMove(this.key);
    this.squareValue = TicTacToeLogic.getState(this.key);
  }

}
