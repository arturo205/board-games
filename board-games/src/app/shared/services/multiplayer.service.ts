import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../socket';

import * as socketIO from 'socket.io-client';
import { ChatMessage } from '../chat-message';
import { Player } from '../player';
import { SystemMessage } from '../system-message';
import { TicTacToeStatus } from '../../logic/tic-tac-toe/server/tic-tac-toe-status';
import { TicTacToeMove } from '../../logic/tic-tac-toe/server/tic-tac-toe-move';
import { Games } from 'app/logic/games';
import { TicTacToeSummaryElement } from 'app/logic/tic-tac-toe/server/tic-tac-toe-summary-element';
import { Score } from 'app/shared/score';

@Injectable()
export class MultiplayerService {

    private socket: any;
    public selectedGame: Games = Games.Login;
    public loginState: SystemMessage = new SystemMessage(false, "Not logged in. Please login or create a player");
    public isConnected: boolean = false;
    public allConnectedPlayers: Array<Player> = new Array<Player>();
    public allChatMessages: Array<ChatMessage> = new Array<ChatMessage>();
    public currentPlayer: Player = new Player("generic_player_local", "", 0, 0);
    public serverTicTacToeStatus: TicTacToeStatus = new TicTacToeStatus(-1);
    public localTicTacToeSquares: Array<string> = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    public ticTacToeSummary: TicTacToeSummaryElement;
    public ticTacToeHighestScores: Array<Score> = new Array<Score>();
    public gameCurrentScore: string = "00000000";
    public localMessage: string = "";
    public joinedGame: Games = null;

    /**
     * Initialization
     */

    public initSocket(serverUrl: string): void {
        this.socket = socketIO(serverUrl);
    }

    /**
     * Player calls
     */

    public disconnectFromServer(): void {
        this.socket.emit('disconnect');
        this.socket = null;
    }

    public addPlayer(player: Player): void {
        this.currentPlayer = player;
        this.socket.emit('newPlayer', player);
        this.loadAllGamesSummary();
    }

    public onAddPlayer(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('newPlayer', (newPlayer: any) => observer.next(newPlayer));
        });
    }

    public updatePlayer(updatedPlayer: Player): void {
        this.currentPlayer = updatedPlayer;
        this.socket.emit('updatePlayer', updatedPlayer);
    }

    public onUpdatePlayer(): Observable<SystemMessage> {
        return new Observable<SystemMessage>(observer => {
            this.socket.on('updatePlayer', (message: SystemMessage) => observer.next(message));
        });
    }

    public login(name: string, password: string): void {
        this.socket.emit('login', name, password);
        this.loadAllGamesSummary();
    }

    public logout(): void {
        this.socket.emit('logout');
        this.resetMessages();
        this.currentPlayer = new Player("generic_player_local", "", 0, 0);
    }

    public onLogin(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('login', (player: any) => observer.next(player));
        });
    }

    public loadAllPlayers(): void {
        this.socket.emit('allPlayers');
    }

    public onAllPlayers(): Observable<Array<Player>> {
        return new Observable<Array<Player>>(observer => {
            this.socket.on('allPlayers', (allPlayers: Array<Player>) => observer.next(allPlayers));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }

    public onConnect(player: Player): Observable<Event> {
        return new Observable<Event>(observer => {
            this.socket.on(Event.CONNECT, (player) => observer.next());
        });
    }

    private resetMessages(): void {
        this.loginState.result = false;
        this.loginState.message = "Not logged in. Please login or create a player";
        this.allConnectedPlayers.splice(0, this.allConnectedPlayers.length);
    }

    /**
     * Chat calls
     */

    public addNewChatMessage(chatMesage: ChatMessage): void {
        this.socket.emit('newChatMessage', chatMesage);
    }

    public onChatMessage(): Observable<Array<ChatMessage>> {
        return new Observable<Array<ChatMessage>>(observer => {
            this.socket.on('newChatMessage', (allChatMessages: Array<ChatMessage>) => observer.next(allChatMessages));
        });
    }

    /**
     * Tic Tac Toe calls
     */

    public newTicTacToeGame(): void {
        this.socket.emit('newTicTacToe', this.currentPlayer);
    }

    public joinTicTacToeGame(gameId: number): void {
        this.socket.emit('joinTicTacToe', this.currentPlayer, gameId);
    }

    public onTicTacToeStatus(): Observable<TicTacToeStatus> {
        return new Observable<TicTacToeStatus>(observer => {
            this.socket.on('ticTacToeStatus', (status: TicTacToeStatus) => observer.next(status));
        });
    }

    public onTicTacToeSystemMessage(): Observable<SystemMessage> {
        return new Observable<SystemMessage>(observer => {
            this.socket.on('ticTacToeSystemMessage', (message: SystemMessage) => observer.next(message));
        });
    }

    public performTicTacToeMove(move: TicTacToeMove): void {
        this.socket.emit('performTicTacToeMove', move, this.serverTicTacToeStatus.gameId);
    }

    public resetTicTacToe(): void {
        this.socket.emit('resetTicTacToe', this.serverTicTacToeStatus.gameId);
    }

    public leaveTicTacToe(): void {
        this.socket.emit('leaveTicTacToe', this.currentPlayer, this.serverTicTacToeStatus.gameId);
        this.joinedGame = null;
        this.serverTicTacToeStatus = new TicTacToeStatus(-1);
    }

    public onTicTacToeSummary(): Observable<TicTacToeSummaryElement> {
        return new Observable<TicTacToeSummaryElement>(observer => {
            this.socket.on('ticTacToeSummary', (summaryElement: TicTacToeSummaryElement) => observer.next(summaryElement));
        });
    }

    public saveTicTacToeScore(score: number): void {
        this.socket.emit('ticTacToeSaveScore', this.currentPlayer, score);
    }

    public getTicTacToeHighestScores(numberOfLines: number): void {
        this.socket.emit('ticTacToeScores', numberOfLines);
    }

    public onTicTacToeHighestScores(): Observable<Array<Score>> {
        return new Observable<Array<Score>>(observer => {
            this.socket.on('ticTacToeScores', (ticTacToeAllScores: Array<Score>) => observer.next(ticTacToeAllScores));
        });
    }

    public onGetTicTacToeUserScore(): Observable<number> {
        return new Observable<number>(observer => {
            this.socket.on('ticTacToeUserScore', (score: number) => observer.next(score));
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
                    this.currentPlayer = new Player(player.name, player.password, player.colorId, player.iconId);
                    this.currentPlayer.id = player.id;
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
                    this.currentPlayer = new Player(player.name, player.password, player.colorId, player.iconId);
                    this.currentPlayer.id = player.id;
                    this.loginState = new SystemMessage(true, 'You logged in! Welcome ' + this.currentPlayer.name);
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
                this.socket.disconnect();
                this.resetMessages();
                console.log('disconnected');
            });

            this.onTicTacToeStatus().subscribe((status: TicTacToeStatus) => {
                this.serverTicTacToeStatus = status;
                this.updateLocalTicTacToeObjects();
            });

            this.onTicTacToeSystemMessage().subscribe((message: SystemMessage) => {
                this.serverTicTacToeStatus.systemMessage = message;
            });

            this.onTicTacToeSummary().subscribe((summaryElement: TicTacToeSummaryElement) => {
                this.ticTacToeSummary = summaryElement;
            });

            this.onTicTacToeHighestScores().subscribe((highestScores: Array<Score>) => {
                this.ticTacToeHighestScores = highestScores;
            });

            this.onGetTicTacToeUserScore().subscribe((userScore: number) => {
                this.gameCurrentScore = this.formatScoreNumber(userScore);
            });
        }

    }

    public getGeneralMessage(): string {
        return this.serverTicTacToeStatus.systemMessage.message + " " + this.localMessage;
    }

    private updateLocalTicTacToeObjects(): void {

        this.joinedGame = this.playerJoinedTicTacToe() ? Games.TicTacToe : null;

        this.serverTicTacToeStatus.squaresStatus.forEach((serverPlayerObj, index) => {
            
            if (serverPlayerObj !== null && this.serverTicTacToeStatus.playersConnected.length === 2 && this.serverTicTacToeStatus.charactersFromPlayers.length == 2) {
                if (serverPlayerObj.name === this.serverTicTacToeStatus.playersConnected[0].name) {
                    this.localTicTacToeSquares[index] = this.serverTicTacToeStatus.charactersFromPlayers[0];
                }
                else if (serverPlayerObj.name === this.serverTicTacToeStatus.playersConnected[1].name) {
                    this.localTicTacToeSquares[index] = this.serverTicTacToeStatus.charactersFromPlayers[1];
                }
            }
            else if (serverPlayerObj === null && this.serverTicTacToeStatus.playersConnected.length === 2 && this.serverTicTacToeStatus.charactersFromPlayers.length == 2) {
                this.localTicTacToeSquares[index] = " ";
            }
        });

    }

    private playerJoinedTicTacToe(): boolean {

        let playerIsInArray: boolean = false;

        this.serverTicTacToeStatus.playersConnected.forEach(player => {
            if (player.name === this.currentPlayer.name) {
                playerIsInArray = true;
            }
        });

        return playerIsInArray;

    }

    public loadCurrentGameScore(): void {

        this.socket.emit('ticTacToeUserScore', this.currentPlayer);

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

        this.socket.emit('ticTacToeSummary');

    }

    public leaveCurrentGame(): void {

        switch (this.joinedGame) {
            case Games.TicTacToe: this.leaveTicTacToe(); break;
            default: break;
        }

    }

}
