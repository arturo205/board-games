import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfBoardComponent } from './cf-board.component';

describe('CfBoardComponent', () => {
  let component: CfBoardComponent;
  let fixture: ComponentFixture<CfBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
