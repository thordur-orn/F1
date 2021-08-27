import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastestLapsComponent } from './fastest-laps.component';

describe('FastestLapsComponent', () => {
  let component: FastestLapsComponent;
  let fixture: ComponentFixture<FastestLapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastestLapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastestLapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
