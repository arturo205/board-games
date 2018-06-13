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

  //public ioConnection: any;
  public isConnected: boolean = false;
  public isLoggedIn: boolean = false;
  public loginMessage: string = "";

  constructor(private multiplayerService: MultiplayerService) {
    this.loginMessage = "Not logged in. Please login or create user";
  }

  ngOnInit() { }

  private connectToServer(serverUrl: string): void {

    this.multiplayerService.initSocket(serverUrl);

    this.multiplayerService.onAddUser().subscribe((sysMessage: SystemMessage) => {
      this.isLoggedIn = sysMessage.result;
      this.loginMessage = sysMessage.message;
    });

    this.multiplayerService.onLogin().subscribe((sysMessage: SystemMessage) => {
      this.isLoggedIn = sysMessage.result;
      this.loginMessage = sysMessage.message;
    });

    this.multiplayerService.onEvent(Event.CONNECT).subscribe(() => {
      this.isConnected = true;
      console.log('connected');
    });

    this.multiplayerService.onEvent(Event.DISCONNECT).subscribe(() => {
      this.isConnected = false;
      console.log('disconnected');
    });

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
