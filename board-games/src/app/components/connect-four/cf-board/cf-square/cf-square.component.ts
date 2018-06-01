import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cf-square',
  templateUrl: './cf-square.component.html',
  styleUrls: ['./cf-square.component.css']
})
export class CfSquareComponent implements OnInit {

  public selectedPlayer: number = 0;

  constructor() { }

  ngOnInit() { }

}
