import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { TicTacToeComponent } from './components/tic-tac-toe/tic-tac-toe.component';
import { BoardComponent } from './components/tic-tac-toe/board/board.component';
import { SquareComponent } from './components/tic-tac-toe/board/square/square.component';
import { ConnectFourComponent } from './components/connect-four/connect-four.component';
import { OtherComponent } from './components/other/other.component';
import { CfBoardComponent } from './components/connect-four/cf-board/cf-board.component';
import { CfSquareComponent } from './components/connect-four/cf-board/cf-square/cf-square.component';
import { DynamicComponentService } from 'app/shared/services/dynamic-component.service';
import { MultiplayerService } from './shared/services/multiplayer.service';
import { ChatComponent } from './shared/components/chat/chat.component';
import { LogInComponent } from './components/log-in/log-in.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideBarComponent,
    TicTacToeComponent,
    BoardComponent,
    SquareComponent,
    ConnectFourComponent,
    OtherComponent,
    CfBoardComponent,
    CfSquareComponent,
    ChatComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [DynamicComponentService, MultiplayerService],
  bootstrap: [AppComponent],
  entryComponents: [CfSquareComponent]
})
export class AppModule { }
