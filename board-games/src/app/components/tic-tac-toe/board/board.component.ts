import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { SquareComponent } from 'app/components/tic-tac-toe/board/square/square.component';
import { TicTacToeLogic } from 'app/logic/tic-tac-toe/game-rules';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @ViewChildren('squares') squares: QueryList<SquareComponent>;

  public message: string = "";
  public turnMessage: string = "";
  public status: number = 0;          // 0: Turn O        1: Turn X        2: Winner
  private logic: TicTacToeLogic = new TicTacToeLogic();

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    let initialArray: Array<string> = new Array<string>();
    this.squares.forEach((square, key) => {
      square.key = key;
      initialArray.push(square.squareValue);
    });
    TicTacToeLogic.initializeLogic(initialArray);
    this.updateMessages();
  }
  
  public boardClick(): void {
    this.updateMessages();
    if (TicTacToeLogic.gameOver) {
      this.setWinnerSquares();
      this.status = 2;
    }
    else if (TicTacToeLogic.turn) {
      this.status = 0;
    }
    else {
      this.status = 1;
    }
  }

  private setWinnerSquares(): void {
    Object.values(TicTacToeLogic.winnerCombination).forEach(winnerKey => {
      this.squares.forEach(square => {
        if (square.key === winnerKey) {
          square.setWinner();
        }
        else {
          square.setNonWinner();
        }
      });
    });
  }

  private updateMessages(): void {
    this.message = TicTacToeLogic.message;
    this.turnMessage = TicTacToeLogic.turnMessage;
  }

  public resetBoard(): void {
    let initialArray: Array<string> = new Array<string>();
    this.squares.forEach((square, key) => {
      square.resetValue();
      initialArray.push(square.squareValue);
    });
    TicTacToeLogic.initializeLogic(initialArray);
    this.boardClick();
  }

}
