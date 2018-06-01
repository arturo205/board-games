import { Component, OnInit } from '@angular/core';
import { Games, AllGames } from 'app/logic/games';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  public selectedGame: Games;

  constructor() { }

  ngOnInit() {
    this.selectedGame = Games.TicTacToe;
  }

  ngAfterViewInit() { }

  public onClick(game: string): void {
    this.selectedGame = AllGames.getGame(game);
  }

}
