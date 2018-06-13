import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from 'app/shared/services/multiplayer.service';
import { Event } from 'app/shared/socket';
import { ChatMessage } from 'app/shared/chat-message';
import { User } from '../../shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public ioConnection: any;
  public serverMessage: any;

  constructor(private multiplayerService: MultiplayerService) { }

  ngOnInit() {
    //this.initializeServerConnection();
  }

  /*public connectToServer(playerName: string): void {
    this.multiplayerService.send(new ChatMessage(new User("Arturo"), playerName));
  }

  public readServer(): void {
    this.serverMessage = this.multiplayerService.onMessage();
    console.log(this.serverMessage);
  }

  private initializeServerConnection(): void {
    this.multiplayerService.initSocket();
    this.ioConnection = this.multiplayerService.onMessage()
      .subscribe((chatMessage: ChatMessage) => {
        console.log("Message received from server!");
        console.log(chatMessage.message);
      });
    this.multiplayerService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });
    this.multiplayerService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }*/

}
