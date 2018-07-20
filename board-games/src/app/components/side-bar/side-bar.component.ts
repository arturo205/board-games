import { Component, OnInit } from '@angular/core';
import { Games, AllGames } from '../../logic/games';
import { MultiplayerService } from '../../shared/services/multiplayer.service';
import { ModalService } from '../../shared/services/modal.service';

@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

    public selectedGame: Games;

    constructor(private multiplayerService: MultiplayerService, private modalService: ModalService) { }

    ngOnInit() {

        this.selectedGame = Games.Login;

    }

    ngAfterViewInit() { }

    public onClick(game: string): void {

        if (this.multiplayerService.loginState.result) {
            this.selectedGame = AllGames.getGame(game);
        }
        else {
            this.modalService.open('not-logged-in');
        }

    }

    public closeModal(id: string): void {

        this.modalService.close(id);

    }

}
