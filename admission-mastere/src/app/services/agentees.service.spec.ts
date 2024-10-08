import { TestBed } from '@angular/core/testing';

import { AgenteesService } from './agentees.service';

describe('AgenteesService', () => {
  let service: AgenteesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgenteesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
