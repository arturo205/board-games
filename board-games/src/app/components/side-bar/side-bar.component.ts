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

        if (this.playerIsLoggedIn(game)) {
            if (game === 'ConnectFour') {
                this.modalService.open('no-access');
            }
            else {
                this.selectedGame = AllGames.getGame(game);
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

}
