import { Component, OnInit } from '@angular/core';
import { Games } from './logic/games';
import { MultiplayerService } from 'app/shared/services/multiplayer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public multiplayerService: MultiplayerService) { }

  ngOnInit() {

    this.multiplayerService.selectedGame = Games.Login;
  
  }

}
