import { TestBed } from '@angular/core/testing';

import { DriverSeasonsService } from './driver-seasons.service';

describe('DriverSeasonsService', () => {
  let service: DriverSeasonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverSeasonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
