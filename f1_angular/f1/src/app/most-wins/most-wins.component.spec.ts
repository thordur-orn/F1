import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostWinsComponent } from './most-wins.component';

describe('MostWinsComponent', () => {
  let component: MostWinsComponent;
  let fixture: ComponentFixture<MostWinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostWinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostWinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
