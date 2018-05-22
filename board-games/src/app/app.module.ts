import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { BoardComponent } from './components/tic-tac-toe/board/board.component';
import { SquareComponent } from './components/tic-tac-toe/board/square/square.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    TicTacToeComponent,
    BoardComponent,
    SquareComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
