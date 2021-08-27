import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSeasonsComponent } from './driver-seasons.component';

describe('DriverSeasonsComponent', () => {
  let component: DriverSeasonsComponent;
  let fixture: ComponentFixture<DriverSeasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverSeasonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
