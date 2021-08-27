import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPodiumsComponent } from './most-podiums.component';

describe('MostPodiumsComponent', () => {
  let component: MostPodiumsComponent;
  let fixture: ComponentFixture<MostPodiumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPodiumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPodiumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
