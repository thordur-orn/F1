import { TestBed } from '@angular/core/testing';

import { TeamDriversService } from './team-drivers.service';

describe('TeamDriversService', () => {
  let service: TeamDriversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamDriversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
