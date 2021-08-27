import { TestBed } from '@angular/core/testing';

import { SeasonResultsService } from './season-results.service';

describe('SeasonResultsService', () => {
  let service: SeasonResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
