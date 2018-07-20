import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from '../../shared/services/multiplayer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public ioConnection: any;
  public serverMessage: any;

  constructor(private multiplayerService: MultiplayerService) { }

  ngOnInit() { }

}
