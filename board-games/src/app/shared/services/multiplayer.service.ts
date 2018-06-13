import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from 'app/shared/socket';

import * as socketIO from 'socket.io-client';
import { ChatMessage } from 'app/shared/chat-message';
import { User } from 'app/shared/user';
import { SystemMessage } from 'app/shared/system-message';

@Injectable()
export class MultiplayerService {

  private socket;

  public initSocket(serverUrl: string): void {
    this.socket = socketIO(serverUrl);
  }

  public send(chatMesage: ChatMessage): void {
    this.socket.emit('message', chatMesage);
  }

  public onMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>(observer => {
      this.socket.on('message', (data: ChatMessage) => observer.next(data));
    });
  }

  public addUser(user: User): void {
    this.socket.emit('newUser', user);
  }

  public onAddUser(): Observable<SystemMessage> {
    return new Observable<SystemMessage>(observer => {
      this.socket.on('newUser', (sysMessage: SystemMessage) => observer.next(sysMessage));
    });
  }

  public login(user: User): void {
    this.socket.emit('login', user);
  }

  public onLogin(): Observable<SystemMessage> {
    return new Observable<SystemMessage>(observer => {
      this.socket.on('login', (sysMessage: SystemMessage) => observer.next(sysMessage));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }

  public onConnect(user: User) {
    return new Observable<Event>(observer => {
      this.socket.on(Event.CONNECT, (user) => observer.next());
    });
  }
}
