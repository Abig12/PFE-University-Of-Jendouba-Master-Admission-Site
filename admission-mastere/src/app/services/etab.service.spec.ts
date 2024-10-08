import { TestBed } from '@angular/core/testing';

import { EtabService } from './etab.service';

describe('EtabService', () => {
  let service: EtabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
