import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitWinnersComponent } from './circuit-winners.component';

describe('CircuitWinnersComponent', () => {
  let component: CircuitWinnersComponent;
  let fixture: ComponentFixture<CircuitWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CircuitWinnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
