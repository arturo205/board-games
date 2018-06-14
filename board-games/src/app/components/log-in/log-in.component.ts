import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from 'app/shared/services/multiplayer.service';
import { Event } from 'app/shared/socket';
import { User } from 'app/shared/user';
import { SystemMessage } from 'app/shared/system-message';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private multiplayerService: MultiplayerService) { }

  ngOnInit() { }

  private connectToServer(serverUrl: string): void {

    this.multiplayerService.connectToServer(serverUrl);

  }

  public createUser(userName: string, password: string): void {

    let user = new User(userName, password);
    this.multiplayerService.addUser(user);

  }

  public login(userName: string, password: string): void {

    let user = new User(userName, password);
    this.multiplayerService.login(user);

  }

}
