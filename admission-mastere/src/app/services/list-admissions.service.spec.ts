import { TestBed } from '@angular/core/testing';

import { ListAdmissionsService } from './list-admissions.service';

describe('ListAdmissionsService', () => {
  let service: ListAdmissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListAdmissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
