import { TestBed } from '@angular/core/testing';

import { MasCandService } from './mas-cand.service';

describe('MasCandService', () => {
  let service: MasCandService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasCandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
