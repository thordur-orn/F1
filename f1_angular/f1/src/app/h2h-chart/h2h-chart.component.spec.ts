import { ComponentFixture, TestBed } from '@angular/core/testing';

import { H2hChartComponent } from './h2h-chart.component';

describe('H2hChartComponent', () => {
  let component: H2hChartComponent;
  let fixture: ComponentFixture<H2hChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ H2hChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(H2hChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
