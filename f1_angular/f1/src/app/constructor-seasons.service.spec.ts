import { TestBed } from '@angular/core/testing';

import { ConstructorSeasonsService } from './constructor-seasons.service';

describe('ConstructorSeasonsService', () => {
  let service: ConstructorSeasonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConstructorSeasonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
