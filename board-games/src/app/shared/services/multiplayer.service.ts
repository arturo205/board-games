import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'app/shared/socket';

import * as socketIO from 'socket.io-client';
import { ChatMessage } from 'app/shared/chat-message';
import { User } from 'app/shared/user';
import { SystemMessage } from 'app/shared/system-message';
import { TicTacToeStatus } from 'app/logic/tic-tac-toe/server/tic-tac-toe-status';
import { TicTacToeMove } from 'app/logic/tic-tac-toe/server/tic-tac-toe-move';

@Injectable()
export class MultiplayerService {

    private socket: any;
    public loginState: SystemMessage = new SystemMessage(false, "Not logged in. Please login or create a user");
    public isConnected: boolean = false;
    public allConnectedUsers: Array<User> = new Array<User>();
    public allChatMessages: Array<ChatMessage> = new Array<ChatMessage>();
    public currentUser: User = new User("generic_user_local", "");
    public serverTicTacToeStatus: TicTacToeStatus = new TicTacToeStatus();
    public localTicTacToeSquares: Array<string> = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    public localMessage: string = "";

    /**
     * Initialization
     */

    public initSocket(serverUrl: string): void {
        this.socket = socketIO(serverUrl);
    }

    /**
     * User calls
     */

    public addUser(user: User): void {
        this.currentUser = user;
        this.socket.emit('newUser', user);
    }

    public onAddUser(): Observable<SystemMessage> {
        return new Observable<SystemMessage>(observer => {
            this.socket.on('newUser', (sysMessage: SystemMessage) => observer.next(sysMessage));
        });
    }

    public login(user: User): void {
        this.currentUser = user;
        this.socket.emit('login', user);
    }

    public onLogin(): Observable<SystemMessage> {
        return new Observable<SystemMessage>(observer => {
            this.socket.on('login', (sysMessage: SystemMessage) => observer.next(sysMessage));
        });
    }

    public loadAllUsers(): void {
        this.socket.emit('allUsers');
    }

    public onAllUsers(): Observable<Array<User>> {
        return new Observable<Array<User>>(observer => {
            this.socket.on('allUsers', (allUsers: Array<User>) => observer.next(allUsers));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }

    public onConnect(user: User): Observable<Event> {
        return new Observable<Event>(observer => {
            this.socket.on(Event.CONNECT, (user) => observer.next());
        });
    }

    private resetMessages(): void {
        this.loginState.result = false;
        this.loginState.message = "Not logged in. Please login or create a user";
        this.allConnectedUsers.splice(0, this.allConnectedUsers.length);
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

    public joinTicTacToeGame(): void {
        this.socket.emit('joinTicTacToe', this.currentUser);
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
        this.socket.emit('performTicTacToeMove', move);
    }

    public resetTicTacToe(): void {
        this.socket.emit('resetTicTacToe');
    }

    /**
     * Listeners
     */

    public connectToServer(serverUrl: string): void {

        if (!this.isConnected) {

            this.initSocket(serverUrl);

            this.onAddUser().subscribe((sysMessage: SystemMessage) => {
                this.loginState = sysMessage;
                this.loadAllUsers();
            });

            this.onLogin().subscribe((sysMessage: SystemMessage) => {
                this.loginState = sysMessage;
                this.loadAllUsers();
            });

            this.onAllUsers().subscribe((allUsers: Array<User>) => {
                this.allConnectedUsers = allUsers;
            });

            this.onChatMessage().subscribe((allChatMessages: Array<ChatMessage>) => {
                this.allChatMessages = allChatMessages;
            });

            this.onEvent(Event.CONNECT).subscribe(() => {
                this.isConnected = true;
                this.loadAllUsers();
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
        }

    }

    public getGeneralMessage(): string {
        return this.serverTicTacToeStatus.systemMessage.message + " " + this.localMessage;
    }

    private updateLocalTicTacToeObjects(): void {

        this.serverTicTacToeStatus.squaresStatus.forEach((serverUserObj, index) => {
            if (serverUserObj !== null && this.serverTicTacToeStatus.playersConnected.length === 2 && this.serverTicTacToeStatus.charactersFromPlayers.length == 2) {
                if (serverUserObj.userName === this.serverTicTacToeStatus.playersConnected[0].userName) {
                    this.localTicTacToeSquares[index] = this.serverTicTacToeStatus.charactersFromPlayers[0];
                }
                else if (serverUserObj.userName === this.serverTicTacToeStatus.playersConnected[1].userName) {
                    this.localTicTacToeSquares[index] = this.serverTicTacToeStatus.charactersFromPlayers[1];
                }
            }
            else if (serverUserObj === null && this.serverTicTacToeStatus.playersConnected.length === 2 && this.serverTicTacToeStatus.charactersFromPlayers.length == 2) {
                this.localTicTacToeSquares[index] = " ";
            }
        });

    }
}
