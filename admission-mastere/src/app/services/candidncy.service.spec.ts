import { TestBed } from '@angular/core/testing';

import { CandidncyService } from './candidncy.service';

describe('CandidncyService', () => {
  let service: CandidncyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidncyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
