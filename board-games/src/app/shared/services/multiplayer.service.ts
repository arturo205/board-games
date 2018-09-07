import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../socket';

import * as socketIO from 'socket.io-client';
import { ChatMessage } from '../chat-message';
import { Player } from '../player';
import { SystemMessage } from '../system-message';
import { Games, AllGames } from 'app/logic/games';
import { Score } from 'app/shared/score';
import { TicTacToeService } from 'app/shared/services/tic-tac-toe/tic-tac-toe-calls';
import { ConnectFourService } from 'app/shared/services/connect-four/connect-four-calls';
import { ServiceHelper } from 'app/shared/services/general/general-objects';

@Injectable()
export class MultiplayerService {

    public ticTacToeService: TicTacToeService = new TicTacToeService();
    public connectFourService: ConnectFourService = new ConnectFourService();
    public selectedGame: Games = Games.Login;
    public loginState: SystemMessage = new SystemMessage(false, "Not logged in. Please login or create a player");
    public isConnected: boolean = false;
    public allConnectedPlayers: Array<Player> = new Array<Player>();
    public allChatMessages: Array<ChatMessage> = new Array<ChatMessage>();
    public highestScoresForCurrentGame: Array<Score> = new Array<Score>();
    public gameCurrentScore: string = "00000000";
    public localMessage: string = "";

    public initSocket(serverUrl: string): void {
        ServiceHelper.socket = socketIO(serverUrl);
    }

    /**
     * General calls
     */

    public disconnectFromServer(): void {
        ServiceHelper.socket.emit('disconnect');
        ServiceHelper.socket = null;
    }

    public addPlayer(player: Player): void {
        ServiceHelper.currentPlayer = player;
        ServiceHelper.socket.emit('newPlayer', player);
        this.loadAllGamesSummary();
    }

    public onAddPlayer(): Observable<any> {
        return new Observable<any>(observer => {
            ServiceHelper.socket.on('newPlayer', (newPlayer: any) => observer.next(newPlayer));
        });
    }

    public updatePlayer(updatedPlayer: Player): void {
        ServiceHelper.currentPlayer = updatedPlayer;
        ServiceHelper.socket.emit('updatePlayer', updatedPlayer);
    }

    public onUpdatePlayer(): Observable<SystemMessage> {
        return new Observable<SystemMessage>(observer => {
            ServiceHelper.socket.on('updatePlayer', (message: SystemMessage) => observer.next(message));
        });
    }

    public login(name: string, password: string): void {
        ServiceHelper.socket.emit('login', name, password);
        this.loadAllGamesSummary();
    }

    public logout(): void {
        ServiceHelper.socket.emit('logout');
        this.resetMessages();
        ServiceHelper.currentPlayer = new Player("generic_player_local", "", 0, 0);
    }

    public onLogin(): Observable<any> {
        return new Observable<any>(observer => {
            ServiceHelper.socket.on('login', (player: any) => observer.next(player));
        });
    }

    public loadAllPlayers(): void {
        ServiceHelper.socket.emit('allPlayers');
    }

    public onAllPlayers(): Observable<Array<Player>> {
        return new Observable<Array<Player>>(observer => {
            ServiceHelper.socket.on('allPlayers', (allPlayers: Array<Player>) => observer.next(allPlayers));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            ServiceHelper.socket.on(event, () => observer.next());
        });
    }

    public onConnect(player: Player): Observable<Event> {
        return new Observable<Event>(observer => {
            ServiceHelper.socket.on(Event.CONNECT, (player) => observer.next());
        });
    }

    private resetMessages(): void {
        this.loginState.result = false;
        this.loginState.message = "Not logged in. Please login or create a player";
        this.allConnectedPlayers.splice(0, this.allConnectedPlayers.length);
    }

    public getHighestScores(numberOfLines: number): void {
        ServiceHelper.socket.emit('highestScores', numberOfLines, AllGames.getGameId(this.selectedGame));
    }

    public onHighestScores(): Observable<Array<Score>> {
        return new Observable<Array<Score>>(observer => {
            ServiceHelper.socket.on('highestScores', (allScores: Array<Score>) => observer.next(allScores));
        });
    }

    public onGetUserScore(): Observable<number> {
        return new Observable<number>(observer => {
            ServiceHelper.socket.on('userScore', (score: number) => observer.next(score));
        });
    }

    /**
     * Chat calls
     */

    public addNewChatMessage(chatMesage: ChatMessage): void {
        ServiceHelper.socket.emit('newChatMessage', chatMesage);
    }

    public onChatMessage(): Observable<Array<ChatMessage>> {
        return new Observable<Array<ChatMessage>>(observer => {
            ServiceHelper.socket.on('newChatMessage', (allChatMessages: Array<ChatMessage>) => observer.next(allChatMessages));
        });
    }

    /**
     * Listeners
     */

    public connectToServer(serverUrl: string): void {

        if (!this.isConnected) {

            this.initSocket(serverUrl);

            this.onAddPlayer().subscribe((player: any) => {
                if (player['name'] !== undefined) {
                    ServiceHelper.currentPlayer = new Player(player.name, player.password, player.colorId, player.iconId);
                    ServiceHelper.currentPlayer.id = player.id;
                    this.loginState = new SystemMessage(true, 'The player was successfully created! You are logged in');
                }
                else if (player['message'] !== undefined) {
                    this.loginState = new SystemMessage(player.result, player.message);
                }
                this.loadAllPlayers();
            });

            this.onUpdatePlayer().subscribe((message: SystemMessage) => {
                this.loginState = message;
                if (this.loginState.result === false) {
                    this.allConnectedPlayers.splice(0, this.allConnectedPlayers.length);
                }
            });

            this.onLogin().subscribe((player: any) => {
                if (player['name'] !== undefined) {
                    ServiceHelper.currentPlayer = new Player(player.name, player.password, player.colorId, player.iconId);
                    ServiceHelper.currentPlayer.id = player.id;
                    this.loginState = new SystemMessage(true, 'You logged in! Welcome ' + ServiceHelper.currentPlayer.name);
                }
                else if (player['message'] !== undefined) {
                    this.loginState = new SystemMessage(player.result, player.message);
                }
                this.loadAllPlayers();
            });

            this.onAllPlayers().subscribe((allPlayers: Array<Player>) => {
                this.allConnectedPlayers = allPlayers;
            });

            this.onChatMessage().subscribe((allChatMessages: Array<ChatMessage>) => {
                this.allChatMessages = allChatMessages;
            });

            this.onEvent(Event.CONNECT).subscribe(() => {
                this.isConnected = true;
                this.loadAllPlayers();
                console.log('connected');
            });

            this.onEvent(Event.DISCONNECT).subscribe(() => {
                this.isConnected = false;
                ServiceHelper.socket.disconnect();
                this.resetMessages();
                console.log('disconnected');
            });

            this.onHighestScores().subscribe((highestScores: Array<Score>) => {
                this.highestScoresForCurrentGame = highestScores;
            });

            this.onGetUserScore().subscribe((userScore: number) => {
                this.gameCurrentScore = this.formatScoreNumber(userScore);
            });

            this.ticTacToeService.addListeners();
            this.connectFourService.addListeners();
        }

    }

    public getGeneralMessage(): string {
        return this.ticTacToeService.serverTicTacToeStatus.systemMessage.message + " " + this.localMessage;
    }

    public loadCurrentGameScore(): void {

        ServiceHelper.socket.emit('userScore', ServiceHelper.currentPlayer, AllGames.getGameId(this.selectedGame));

    }

    private formatScoreNumber(score: number): string {

        let scoreString: string = score.toString();
        let missingZeros: number = 8 - scoreString.length;

        for (let i=0; i<missingZeros; i++) {
            scoreString = "0" + scoreString;
        }

        return scoreString;

    }

    private loadAllGamesSummary(): void {

        ServiceHelper.socket.emit('ticTacToeSummary');

    }

    public leaveCurrentGame(): void {

        switch (ServiceHelper.joinedGame) {
            case Games.TicTacToe: this.ticTacToeService.leaveTicTacToe(); break;
            default: break;
        }

    }

}
