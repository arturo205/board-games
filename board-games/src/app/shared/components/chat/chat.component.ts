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

  public sendNewChatMessage(newChatMessage: string): void {

    let message: ChatMessage = new ChatMessage(this.multiplayerService.currentUser, newChatMessage);
    this.multiplayerService.addNewChatMessage(message);
    
  }

}
