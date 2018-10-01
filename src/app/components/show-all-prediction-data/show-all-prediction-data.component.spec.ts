import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllPredictionDataComponent } from './show-all-prediction-data.component';

describe('ShowAllPredictionDataComponent', () => {
  let component: ShowAllPredictionDataComponent;
  let fixture: ComponentFixture<ShowAllPredictionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllPredictionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllPredictionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
