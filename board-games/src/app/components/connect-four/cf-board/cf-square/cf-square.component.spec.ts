import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CfSquareComponent } from './cf-square.component';

describe('CfSquareComponent', () => {
  let component: CfSquareComponent;
  let fixture: ComponentFixture<CfSquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CfSquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CfSquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
