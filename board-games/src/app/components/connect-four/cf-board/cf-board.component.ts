import { Component, OnInit, ViewChild, ViewContainerRef, Inject } from '@angular/core';
import { DynamicComponentService } from '../../../shared/services/dynamic-component.service';
import { CfSquareComponent } from './cf-square/cf-square.component';
import { DynamicComponents } from '../../../shared/DynamicComponents';

@Component({
  selector: 'app-cf-board',
  templateUrl: './cf-board.component.html',
  styleUrls: ['./cf-board.component.css']
})
export class CfBoardComponent implements OnInit {
  @ViewChild('dynamicBoard') dynamicBoard: ViewContainerRef;

  public dynamicComponentsService: DynamicComponentService;
  public dynamicSquares: Array<CfSquareComponent>;

  constructor(@Inject(DynamicComponentService) dynamicComponentsService) {
    this.dynamicComponentsService = dynamicComponentsService;
  }

  ngOnInit() {
    this.dynamicComponentsService.setRootViewContainerRef(this.dynamicBoard);
    let newSquare: CfSquareComponent;
    for (let i=0; i<1; i++) {
      newSquare = this.dynamicComponentsService.addDynamicComponent(DynamicComponents.ConnectFourSquare);
      this.dynamicSquares.push(newSquare);
    }
  }

  ngAfterViewInit() {
    
  }

}
