import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from '../../shared/services/multiplayer.service';
import { Player } from '../../shared/player';
import { Games, AllGames } from 'app/logic/games';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

    public selectedLoginTab: string = "login";

    constructor(public multiplayerService: MultiplayerService) { }

    ngOnInit() { }

    public connectToServer(): void {

        let selectedServer: string = document.querySelector('input[name=server]:checked').getAttribute('value');

        switch(selectedServer) {
            case "server1": this.multiplayerService.connectToServer("https://artmonscor-board-games-server.herokuapp.com/"); break;
            case "server2": this.multiplayerService.connectToServer(""); break;
            case "server3": this.multiplayerService.connectToServer(""); break;
            case "server4": this.multiplayerService.connectToServer("http://localhost:8080"); break;
            default: break;
        }
    }

    public isRadioButtonDisabled(radioButtonNumber: number): boolean {

        let isEnabled: boolean = false;

        switch(radioButtonNumber) {
            case 0: isEnabled = this.multiplayerService.isConnected ? true : false; break;
            case 1: isEnabled = true; break;
            case 2: isEnabled = true; break;
            case 3: isEnabled = this.multiplayerService.isConnected ? true : false; break;
            default: break;
        }

        return isEnabled;

    }

    public disconnectFromServer(): void {

        this.multiplayerService.disconnectFromServer();

    }

    public createPlayer(name: string, password: string): void {

        if (name.length > 2 && name.length < 15 && password.length > 2 && password.length < 15) {
            let player = new Player(name, password, this.getSelectedColorIndex("create"), this.getSelectedIconIndex("create"));
            this.multiplayerService.addPlayer(player);
        }
        else {
            this.multiplayerService.loginState.message = "Could not create the player. The name and password must be 3-14 characters long.";
        }

    }

    public login(name: string, password: string): void {

        this.multiplayerService.login(name, password);

    }

    public logout(): void {

        this.multiplayerService.logout();

    }

    public updatePlayer(): void {

        let updatedName: string = (<HTMLInputElement>document.getElementsByName('update-name')[0]).value;
        let updatedPassword: string = (<HTMLInputElement>document.getElementsByName('update-password')[0]).value;
        let updatedColor: number = parseInt((<HTMLSelectElement>document.getElementsByName('update-user-color')[0]).value);
        let updatedIcon: number = parseInt((<HTMLSelectElement>document.getElementsByName('update-user-icon')[0]).value);
        let updatedPlayer: Player = new Player(updatedName, updatedPassword, updatedColor, updatedIcon);
        updatedPlayer.id = this.multiplayerService.currentPlayer.id;
        this.multiplayerService.updatePlayer(updatedPlayer);

    }

    private getSelectedColorIndex(mode: string): number {

        let selectedColorSelect: HTMLSelectElement;
        
        if (mode === "create") {
            selectedColorSelect = document.querySelector('select[name=user-color]');
        }
        else if (mode === "update") {
            selectedColorSelect = document.querySelector('select[name=update-user-color]');
        }

        return parseInt(selectedColorSelect.options[selectedColorSelect.selectedIndex].value);

    }

    private getSelectedIconIndex(mode: string): number {

        let selectedIconSelect: HTMLSelectElement;
        
        if (mode === "create") {
            selectedIconSelect = document.querySelector('select[name=user-icon]');
        }
        else if (mode === "update") {
            selectedIconSelect = document.querySelector('select[name=update-user-icon]');
        }

        return parseInt(selectedIconSelect.options[selectedIconSelect.selectedIndex].value);

    }

    public getIconColor(mode: string): string {
        
        let index: number = this.getSelectedColorIndex(mode);
        return AllGames.getIconColor(index);

    }

    public getIconImage(mode: string): string {

        let index: number = this.getSelectedIconIndex(mode);
        return AllGames.getIconImage(index);

    }

    public getCurrentPlayerName(): string {

        (<HTMLSelectElement>document.getElementsByName("update-user-color")[0]).options[this.multiplayerService.currentPlayer.colorId].selected = true;
        (<HTMLSelectElement>document.getElementsByName("update-user-icon")[0]).options[this.multiplayerService.currentPlayer.iconId].selected = true;
        return this.multiplayerService.currentPlayer.name;

    }

    public openTab(tabName: string): void {

        this.selectedLoginTab = tabName;

    }

}
