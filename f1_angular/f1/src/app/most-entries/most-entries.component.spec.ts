import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostEntriesComponent } from './most-entries.component';

describe('MostEntriesComponent', () => {
  let component: MostEntriesComponent;
  let fixture: ComponentFixture<MostEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MostEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
