import { Component, OnInit, ViewChild } from '@angular/core';
import { BoardComponent } from 'app/components/tic-tac-toe/board/board.component';

@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  @ViewChild('board') board: BoardComponent;

  constructor() { }

  ngOnInit() { }

  public restartGame(): void {
    this.board.resetBoard();
  }

}
