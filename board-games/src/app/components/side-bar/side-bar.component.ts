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

    private pendingScreenToOpen: string;

    constructor(public multiplayerService: MultiplayerService, private modalService: ModalService) { }

    ngOnInit() {

        this.pendingScreenToOpen = "";

    }

    ngAfterViewInit() { }

    public onClick(game: string): void {

        if (this.playerIsLoggedIn(game)) {
            if (game === Games.ConnectFour) {
                this.modalService.open('no-access');
            }
            else if (this.multiplayerService.joinedGame !== null && this.multiplayerService.joinedGame !== game) {
                this.pendingScreenToOpen = game;
                this.modalService.open('close-game');
            }
            else {
                this.multiplayerService.selectedGame = AllGames.getGame(game);
            }
        }

    }

    private playerIsLoggedIn(game: string): boolean {

        let result: boolean = false;

        if (this.multiplayerService.loginState.result) {
            result = true;
        }
        else {
            this.modalService.open('not-logged-in');
        }

        return result;

    }

    public closeModal(id: string): void {

        this.modalService.close(id);

    }

    public leaveCurrentGame(): void {

        this.multiplayerService.leaveCurrentGame();
        this.multiplayerService.selectedGame = AllGames.getGame(this.pendingScreenToOpen);
        this.pendingScreenToOpen = "";
        this.modalService.close('close-game');

    }

}
