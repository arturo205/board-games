import { Injectable } from '@angular/core';
import { Movement } from 'app/shared/movement';
import { Observable } from 'rxjs';

import * as socketIO from 'socket.io-client';

const SERVER_URL = 'http://localhost:8080';

@Injectable()
export class MultiplayerService {

  private socket;

  public initSocket(): void {
    this.socket = socketIO(SERVER_URL);
  }

  public send(movement: Movement): void {
    this.socket.emit('message', movement);
  }

  public onMessage(): Observable<Movement> {
    return new Observable<Movement>(observer => {
      this.socket.on('message', (data: Movement) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}
