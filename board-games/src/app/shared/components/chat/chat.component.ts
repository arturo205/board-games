import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from '../../services/multiplayer.service';
import { ChatMessage } from '../../chat-message';
import { AllGames } from 'app/logic/games';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    constructor(public multiplayerService: MultiplayerService) { }

    ngOnInit() { }

    ngAfterViewInit() {

        /*var newMessageInput: HTMLInputElement = <HTMLInputElement>document.getElementById("newMessageInput");

        newMessageInput.addEventListener("keyup", function (event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("sendButton").click();
            }
        });*/

    }

    public sendNewChatMessage(newChatMessage: string): void {

        if (newChatMessage.length > 0) {
            let message: ChatMessage = new ChatMessage(this.multiplayerService.currentPlayer, newChatMessage);
            this.multiplayerService.addNewChatMessage(message);
            (<HTMLInputElement>document.getElementById("newMessageInput")).value = "";
        }

    }

    public getIconColor(id: number): string {

        return AllGames.getIconColor(id);

    }

    public getIconImage(id: number): string {

        return AllGames.getIconImage(id);

    }

}
