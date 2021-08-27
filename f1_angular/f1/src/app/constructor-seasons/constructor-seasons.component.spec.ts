import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructorSeasonsComponent } from './constructor-seasons.component';

describe('ConstructorSeasonsComponent', () => {
  let component: ConstructorSeasonsComponent;
  let fixture: ComponentFixture<ConstructorSeasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructorSeasonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructorSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
