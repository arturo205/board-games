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
  }
  
  public boardClick(): void {
    this.updateMessages();
  }

  private updateMessages(): void {
    this.message = TicTacToeLogic.message;
    this.turnMessage = TicTacToeLogic.turnMessage;
  }

}
