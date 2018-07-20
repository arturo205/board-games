import { Component, ViewChild, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { Games } from './logic/games';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('sideBar') sideBar: SideBarComponent;

  public selectedGame: Games;

  constructor() { }

  ngOnInit() {
    this.selectedGame = Games.Login;
  }

  public onClick(): void {
    this.selectedGame = this.sideBar.selectedGame;
  }

}
