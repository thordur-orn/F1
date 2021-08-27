import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostPolesComponent } from './most-poles.component';

describe('MostPolesComponent', () => {
  let component: MostPolesComponent;
  let fixture: ComponentFixture<MostPolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostPolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
