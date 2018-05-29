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
  public state: number;         // 0: in-game    1: winner    2: non-winner

  constructor() {
    this.key = -1;
    this.resetValue();
    this.state = 0;
  }

  ngOnInit() { }

  public onClick(): void {
    TicTacToeLogic.performMove(this.key);
    this.squareValue = TicTacToeLogic.getState(this.key);
  }

  public resetValue(): void {
    this.squareValue = " ";
    this.state = 0;
  }

  public setWinner(): void {
    this.state = 1;
  }

  public setNonWinner(): void {
    if (this.state !== 1) {
      this.state = 2;
    }
  }

}
