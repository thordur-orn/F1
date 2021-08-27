import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDriversComponent } from './team-drivers.component';

describe('TeamDriversComponent', () => {
  let component: TeamDriversComponent;
  let fixture: ComponentFixture<TeamDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamDriversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
