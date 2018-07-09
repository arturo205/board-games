import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from 'app/shared/services/multiplayer.service';
import { ChatMessage } from 'app/shared/chat-message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private multiplayerService: MultiplayerService) { }

  ngOnInit() { }

  ngAfterViewInit() {

    var newMessageInput: HTMLInputElement = <HTMLInputElement>document.getElementById("newMessageInput");
    
    newMessageInput.addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById("sendButton").click();
      }
    });

  }

  public sendNewChatMessage(newChatMessage: string): void {

    let message: ChatMessage = new ChatMessage(this.multiplayerService.currentUser, newChatMessage);
    this.multiplayerService.addNewChatMessage(message);
    (<HTMLInputElement>document.getElementById("newMessageInput")).value = "";

  }

}
